const GROUP_MARKER = '@dict-group';

export class DictionaryGroup {
  constructor(
    public readonly value: string,
  ) {}

  static fromLines(lines: string[]): DictionaryGroup | undefined {
    const found = lines.find(line => line.startsWith(GROUP_MARKER));
    
    if (!found) return undefined;

    return new DictionaryGroup(found.replace(GROUP_MARKER, '').trim());
  }
}
