const DESCRIPTION_MARKER = '@dict-desc';

export class DictionaryDescription {
  constructor(
    public value: string,
  ) {}

  static fromLines(lines: string[]): DictionaryDescription | undefined { 
    const found = lines.find(line => line.startsWith(DESCRIPTION_MARKER));

    if (!found) return undefined;

    return new DictionaryDescription(found.replace(DESCRIPTION_MARKER, '').trim());
  }
}
