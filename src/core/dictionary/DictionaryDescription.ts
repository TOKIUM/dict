import { DictionaryTarget } from './DictionaryTarget';

const DESCRIPTION_MARKER = '@dict-desc';

export class DictionaryDescription {
  constructor(
    public readonly target: DictionaryTarget,
    public readonly value: string,
  ) {}

  static fromLines(target: DictionaryTarget, lines: string[]): DictionaryDescription[] { 
    const found = lines.filter(line => line.startsWith(DESCRIPTION_MARKER));

    return found.map((line) => {
      return new DictionaryDescription(target, line.replace(DESCRIPTION_MARKER, '').trim());
    });
  }
}
