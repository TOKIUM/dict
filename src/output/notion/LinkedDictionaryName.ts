import { Dictionary } from '../../core/dictionary/Dictionary';

export class LinkedDictionaryName {
  constructor(
    public readonly name: string,
    public readonly link: string,
  ) {}

  static from(pageId: string, name: string, blockId: string): LinkedDictionaryName {
    const noHyphenBlockId = blockId.replace(/-/g, '');
    return new LinkedDictionaryName(name, `https://www.notion.so/${pageId}#${noHyphenBlockId}`);
  }

  static fromMulti(pageId: string, dictionaries: Dictionary[], blockIds: string[]): LinkedDictionaryName[] {
    return dictionaries.flatMap((dictionary, index) => {
      const nameLink = LinkedDictionaryName.from(pageId, dictionary.name.value, blockIds[index])
      const aliasLinks = dictionary.alias.map((alias) => LinkedDictionaryName.from(pageId, alias.value, blockIds[index]));
      return [nameLink, ...aliasLinks];
    });
  }
}
