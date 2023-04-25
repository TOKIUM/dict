import { Dictionary } from '../core/dictionary/Dictionary';
import { Output } from './Output';

export class YamlOutput implements Output {
  async exec(dictionaries: Dictionary[]): Promise<void> {
    const entry = dictionaries.map((dictionary) => {
      const mainNamePart = `- name: ${dictionary.name.names[0]}`;
      const descriptionPart = `  description: ${dictionary.description.value}`;
      const aliasesHeaderPart = dictionary.name.aliasNames.length > 0 ? ['  aliases:'] : []; 
      const aliasesBodyPart = dictionary.name.aliasNames.map((aliasName) => `    - ${aliasName}`);

      return [
        mainNamePart,
        descriptionPart,
        ...aliasesHeaderPart,
        ...aliasesBodyPart,
      ].join('\n');
    }).join('\n');

    console.log(entry);

    return Promise.resolve();
  }
}
