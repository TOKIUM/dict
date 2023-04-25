const NAME_MARKER = '@dict-name';

export class DictionaryName {
  constructor(
    public value: string,
  ) {}

  static fromLines(lines: string[]): DictionaryName | undefined {
    const found = lines.find(line => line.startsWith(NAME_MARKER));
    
    if (!found) return undefined;

    return new DictionaryName(found.replace(NAME_MARKER, '').trim());
  }
}
