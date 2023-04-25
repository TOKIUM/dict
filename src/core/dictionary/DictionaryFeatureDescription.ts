const FEATURE_DESC_MARKER = '@dict-feature-desc';

export class DictionaryFeatureDescription {
  constructor(
    public value: string,
  ) {}

  static fromLines(lines: string[]): DictionaryFeatureDescription[] {
    const found = lines.filter(line => line.startsWith(FEATURE_DESC_MARKER));

    return found.map((line) => {
      return new DictionaryFeatureDescription(line.replace(FEATURE_DESC_MARKER, '').trim());
    });
  }
}
