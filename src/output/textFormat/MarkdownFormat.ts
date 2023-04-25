import { Dictionary } from '../../core/dictionary/Dictionary';
import { TextFormat } from '../TextFormat';

export class MarkdownFormat implements TextFormat {
  format(dictionary: Dictionary): string {
    const headName = dictionary.name.value;
    const aliasNames = dictionary.alias.map((alias) => alias.value);
    const nameLine = aliasNames.length > 0 ? `# ${headName} (${aliasNames.join(',')})` : `# ${headName}`;
    const descriptionLines = dictionary.descriptions.map((description) => { return description.value; });
    return [
      nameLine,
      ...descriptionLines,
    ].join('\n');
  }

  formatAll(dictionaries: Dictionary[]): string {
    return dictionaries.map((dictionary) => this.format(dictionary)).join('\n\n');
  }
}
