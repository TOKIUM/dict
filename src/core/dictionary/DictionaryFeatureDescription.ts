import { DictionaryTarget } from './DictionaryTarget';

const FEATURE_DESC_MARKER = '@dict-feature-desc';

export class DictionaryFeatureDescription {
  constructor(
    public readonly target: DictionaryTarget,
    public readonly value: string,
  ) {}

  static fromLines(target: DictionaryTarget, lines: string[]): DictionaryFeatureDescription[] {
    const found = lines.filter(line => line.startsWith(FEATURE_DESC_MARKER));

    return found.map((line) => {
      return new DictionaryFeatureDescription(target, line.replace(FEATURE_DESC_MARKER, '').trim());
    });
  }
}
