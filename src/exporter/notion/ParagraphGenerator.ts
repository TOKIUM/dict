import { BlockObjectRequest } from '@notionhq/client/build/src/api-endpoints';
import { Dictionary } from '../../dictionary/Dictionary';

export class BlockGenerator {
  static fromDictionary(dictionary: Dictionary): BlockObjectRequest {
    const descriptionContentBlock: BlockObjectRequest = { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: dictionary.description.value }}] } };
    const aliasContentBlock: BlockObjectRequest = { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: dictionary.name.aliasNames.map((aliasName) => ({ type: 'text', text: { content: aliasName }})) } };
    const aliasBlock: BlockObjectRequest = { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: '別名' }, annotations: { bold: true }}], children: [aliasContentBlock] } };
    const developerContentBlock: BlockObjectRequest = { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `${dictionary.targetFilePath} L${dictionary.targetLine + 1}` }}] } };
    const developerBlock: BlockObjectRequest = { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: '開発者向け情報' }, annotations: { bold: true }}], children: [developerContentBlock] } };

    return {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: dictionary.name.mainName }, annotations: { bold: true } }],
        children: [descriptionContentBlock, aliasBlock, developerBlock],
      }
    }
  }
}
