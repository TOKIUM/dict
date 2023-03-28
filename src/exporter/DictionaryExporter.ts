import { Dictionary } from '../dictionary/Dictionary';
import { Format } from './Format';
import { Client } from '@notionhq/client';
import { BlockObjectRequest, BlockObjectResponse, ParagraphBlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlockGenerator } from './notion/ParagraphGenerator';
import { rateLimitedSequentially } from '../util/promises';

interface DictionaryExporter {
  export(dictionaries: Dictionary[]): Promise<void>;
}

export class MarkdownDictionaryFormatter implements DictionaryExporter {
  async export(dictionaries: Dictionary[]): Promise<void> {
    const message = dictionaries.map((dictionary) => {
      const headName = dictionary.name.names[0];
      const aliasNames = dictionary.name.names.slice(1);
      const nameLine = `## ${headName}`;
      const descriptionHeaderLine = '### 説明';
      const descriptionContentLine = dictionary.description.value;
      const aliasHeaderLine = aliasNames.length > 0 ? '### 別名' : '';
      const aliasContentLine = aliasNames.map((aliasName) => `- ${aliasName}`).join('\n');
      const developerHeaderLine = '### 開発者向け情報';
      const developerContentLine = `${dictionary.targetFilePath} L${dictionary.targetLine + 1}`;

      return [
        nameLine,
        descriptionHeaderLine,
        descriptionContentLine,
        aliasHeaderLine,
        aliasContentLine,
        developerHeaderLine,
        developerContentLine,
      ].join('\n');
    }).join('\n\n')

    console.log(message);

    return Promise.resolve();
  }
}

export class NotionDictionaryFormatter implements DictionaryExporter {
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

  async export(dictionaries: Dictionary[]): Promise<void> {
    // notionの更新API等はページまるごと更新するようなことができないので、いったんすべて消したうえで再度追加する
    // cleanup
    const existingBlocks = await this.notion.blocks.children.list({ block_id: this.pageId });
    await rateLimitedSequentially(existingBlocks.results, 3, (block) => this.notion.blocks.delete({ block_id: block.id }))

    // setup
    const paragraphs = dictionaries.map((dictionary) => BlockGenerator.fromDictionary(dictionary));
    await this.notion.blocks.children.append({
      block_id: this.pageId,
      children: paragraphs,
    });
  }
}

export const DictionaryExporter = {
  from(format: Format): DictionaryExporter {
    switch (format) {
      case 'Markdown':
        return new MarkdownDictionaryFormatter();
      case 'Notion':
        return new NotionDictionaryFormatter();
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }
}
