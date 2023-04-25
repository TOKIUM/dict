import { DictionaryName } from '../../core/dictionary/DictionaryName';

export class LinkedDictionaryName {
  constructor(
    public readonly name: string,
    public readonly link: string,
  ) {}

  static from(pageId: string, dictionaryName: DictionaryName, blockId: string): LinkedDictionaryName[] {
    const noHyphenBlockId = blockId.replace(/-/g, '');
    return dictionaryName.names.map((name) => new LinkedDictionaryName(name, `https://www.notion.so/${pageId}#${noHyphenBlockId}`));
  }

  static fromMulti(pageId: string, dictionaryNames: DictionaryName[], blockIds: string[]): LinkedDictionaryName[] {
    return dictionaryNames.flatMap((dictionaryName, index) => LinkedDictionaryName.from(pageId, dictionaryName, blockIds[index]));
  }
}
