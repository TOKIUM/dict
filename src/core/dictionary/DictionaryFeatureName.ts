const FEATURE_NAME_MARKER = '@dict-feature-name';

export class DictionaryFeatureName {
  constructor(
    public value: string,
  ) {}

  static fromLines(lines: string[]): DictionaryFeatureName | undefined {
    const found = lines.find(line => line.startsWith(FEATURE_NAME_MARKER));
    
    if (!found) return undefined;

    return new DictionaryFeatureName(found.replace(FEATURE_NAME_MARKER, '').trim());
  }
}
