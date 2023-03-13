const NAME_MARKER = '@dict-name';

export class DictionaryName {
  constructor(
    public names: string[],
  ) {}

  static fromLines(lines: string[]): DictionaryName | undefined {
    const found = lines.find(line => line.startsWith(NAME_MARKER));

    if (!found) return undefined;

    const normalized = found.replace(NAME_MARKER, '').split(',').map(name => name.trim());
    return new DictionaryName(normalized);
  }
}
