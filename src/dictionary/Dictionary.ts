import { CodeComment } from '../parser/CodeComment';
import { DictionaryDescription } from './DictionaryDescription';
import { DictionaryName } from './DictionaryName';

export class Dictionary {
  constructor(
    public name: DictionaryName,
    public description: DictionaryDescription,
  ) {}

  static fromLines(lines: string[]): Dictionary | undefined {
    const dictionaryName = DictionaryName.fromLines(lines);
    const dictionaryDescription = DictionaryDescription.fromLines(lines);

    if (!dictionaryName || !dictionaryDescription) {
      return undefined;
    }

    return new Dictionary(dictionaryName, dictionaryDescription);
  }
}
