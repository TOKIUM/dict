import { Dictionary } from '../../core/dictionary/Dictionary';
import { DictionaryDescription } from '../../core/dictionary/DictionaryDescription';
import { DictionaryName } from '../../core/dictionary/DictionaryName';
import { ParagraphBlockGenerator } from './ParagraphBlockGenerator';

describe('ParagraphBlockGenerator', () => {
  it('should generate a paragraph block', () => {
    const dictionary = new Dictionary('User', 'class', 5, 'app/models/user.rb', new DictionaryName(['ユーザー', '従業員']), new DictionaryDescription('ユーザーです') )
    const actual = ParagraphBlockGenerator.fromDictionary(dictionary);

    expect(actual).toEqual({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: 'ユーザー' }, annotations: { bold: true } }],
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: 'ユーザーです' } }],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: '別名' }, annotations: { bold: true } }],
              children: [
                {
                  object: 'block',
                  type: 'bulleted_list_item',
                  bulleted_list_item: {
                    rich_text: [{ type: 'text', text: { content: '従業員' } }],
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: '開発者向け情報' }, annotations: { bold: true } }],
              children: [
                {
                  object: 'block',
                  type: 'paragraph',
                  paragraph: {
                    rich_text: [{ type: 'text', text: { content: 'app/models/user.rb L6' }, annotations: { code: true } }],
                  },
                },
              ],
            },
          },
        ],
      },
    })

  })
})
