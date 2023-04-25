import { Dictionary } from '../core/dictionary/Dictionary';
import { Client } from '@notionhq/client';
import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { ParagraphBlockGenerator } from './notion/ParagraphBlockGenerator';
import { rateLimitedSequentially } from '../util/promises';
import { LinkedDictionaryName } from './notion/LinkedDictionaryName';
import { LinkedRichTextGenerator } from './notion/LinkedRichTextGenerator';
import { Output } from './Output';

export class NotionOutput implements Output {
  private notion: Client;
  private pageId: string;

  constructor(
  ) {
    const token = process.env.NOTION_TOKEN;
    if (token === undefined) { throw new Error('NOTION_TOKEN is not set.'); }

    const page = process.env.NOTION_PAGE_ID;
    if (page === undefined) { throw new Error('NOTION_PAGE_ID is not set.'); }

    this.notion = new Client({ auth: token });
    this.pageId = page;
  }

  async exec(dictionaries: Dictionary[]): Promise<void> {
    // notionの更新API等はページまるごと更新するようなことができないので、いったんすべて消したうえで再度追加する
    // 追加した後に各ブロック内の説明文に、用語ごとにリンクを貼って再度更新することで、用語間の遷移をやりやすくする
    // 1. 既存ページ内のクリーンアップ
    const existingBlocks = await this.notion.blocks.children.list({ block_id: this.pageId });
    await rateLimitedSequentially(existingBlocks.results, 3, (block) => this.notion.blocks.delete({ block_id: block.id }))

    // 2. ページ内への辞書追加 これにより、ページ内の辞書のブロックへのリンクが生成可能になる
    const paragraphs = dictionaries.map((dictionary) => ParagraphBlockGenerator.fromDictionary(dictionary));
    const firstResult = await this.notion.blocks.children.append({
      block_id: this.pageId,
      children: paragraphs,
    });

    // 3. ページ内の辞書説明ブロックに、各用語辞書へのリンクを貼る
    const createdParagraphs = firstResult.results.filter(isParagraphBlock);
    const createdDescriptionParagraphs = await rateLimitedSequentially(
      createdParagraphs,
      3,
      async (paragraph) => {
        const children = await this.notion.blocks.children.list({ block_id: paragraph.id })
        const paragraphChildren = children.results.filter(isParagraphBlock);
        return paragraphChildren[0];
      }
    );
    const linkedDictionaryNames = LinkedDictionaryName.fromMulti(this.pageId, dictionaries, createdParagraphs.map((paragraph) => paragraph.id));
    await rateLimitedSequentially(
      createdDescriptionParagraphs,
      3,
      async (descParagraph) => {
        const texts = LinkedRichTextGenerator.from(descParagraph.paragraph.rich_text[0].plain_text, linkedDictionaryNames);
        await this.notion.blocks.update({
          block_id: descParagraph.id,
          type: 'paragraph',
          paragraph: { rich_text: texts },
        });
      },
    );
  }
}

function isParagraphBlock(block: any): block is ParagraphBlockObjectResponse {
  return block.type === 'paragraph';
}
