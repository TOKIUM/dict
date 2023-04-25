import { Dictionary } from '../core/dictionary/Dictionary';
import { Output } from './Output';

export class MarkdownOutput implements Output {
  async exec(dictionaries: Dictionary[]): Promise<void> {
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
