import { DictionaryTarget } from './DictionaryTarget';

const NAME_MARKER = '@dict-name';

export class DictionaryName {
  constructor(
    public readonly target: DictionaryTarget,
    public readonly value: string,
  ) {}

  static fromLines(target: DictionaryTarget, lines: string[]): DictionaryName | undefined {
    const found = lines.find(line => line.startsWith(NAME_MARKER));
    
    if (!found) return undefined;

    return new DictionaryName(target, found.replace(NAME_MARKER, '').trim());
  }
}
