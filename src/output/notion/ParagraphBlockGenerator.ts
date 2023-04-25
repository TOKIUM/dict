import { BlockObjectRequest } from '@notionhq/client/build/src/api-endpoints';
import { Dictionary } from '../../core/dictionary/Dictionary';

export class ParagraphBlockGenerator {

  /**
   * 辞書からNotionのブロックオブジェクトを生成する
   * 生成されたブロックオブジェクトの見た目はこんな感じ
   * *ユーザー*
   *  ユーザーとは、システムの利用者を指します
   *  *別名*
   *   - 従業員
   * @param dictionary 生成対象の辞書
   * @returns Notionのブロックオブジェクト
   */
  static fromDictionary(dictionary: Dictionary): BlockObjectRequest {
    const descriptionContentBlock: BlockObjectRequest = { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: dictionary.descriptions.map((d) => d.value).join('\n') }}] } };
    const aliasBlock: BlockObjectRequest = {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: '別名' }, annotations: { bold: true }}],
        children: dictionary.alias.map((name) => ({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: name.value }}] } })), }
    };

    return {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: dictionary.name.value }, annotations: { bold: true } }],
        children: [descriptionContentBlock, aliasBlock],
      }
    }
  }
}
