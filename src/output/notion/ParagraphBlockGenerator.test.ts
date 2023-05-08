import { Dictionary } from '../../core/dictionary/Dictionary';
import { DictionaryAlias } from '../../core/dictionary/DictionaryAlias';
import { DictionaryDescription } from '../../core/dictionary/DictionaryDescription';
import { DictionaryName } from '../../core/dictionary/DictionaryName';
import { DictionaryTarget } from '../../core/dictionary/DictionaryTarget';
import { ParagraphBlockGenerator } from './ParagraphBlockGenerator';

describe('ParagraphBlockGenerator', () => {
  it('should generate a paragraph block', () => {
    const dictionaryTarget = new DictionaryTarget('User', 'class', 5, 'app/models/user.rb');
    const dictionary = new Dictionary(new DictionaryName(dictionaryTarget, 'ユーザー'), [new DictionaryAlias('従業員')], [new DictionaryDescription(dictionaryTarget, 'ユーザーです')], [])
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
        ],
      },
    })

  })
})
