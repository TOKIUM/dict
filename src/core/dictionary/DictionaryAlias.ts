
const ALIAS_MARKER = '@dict-alias';

export class DictionaryAlias {
  constructor(
    public readonly value: string,
  ) {}

  static fromLines(lines: string[]): DictionaryAlias[] {
    const found = lines.find(line => line.startsWith(ALIAS_MARKER));

    if (!found) return [];

    const normalized = found.replace(ALIAS_MARKER, '').split(',').map(name => name.trim());
    return normalized.map(values => new DictionaryAlias(values));
  }
}
