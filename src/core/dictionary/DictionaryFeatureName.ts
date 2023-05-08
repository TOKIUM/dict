import { DictionaryTarget } from './DictionaryTarget';

const FEATURE_NAME_MARKER = '@dict-feature-name';

export class DictionaryFeatureName {
  constructor(
    public readonly target: DictionaryTarget,
    public readonly value: string,
  ) {}

  static fromLines(target: DictionaryTarget, lines: string[]): DictionaryFeatureName | undefined {
    const found = lines.find(line => line.startsWith(FEATURE_NAME_MARKER));
    
    if (!found) return undefined;

    return new DictionaryFeatureName(target, found.replace(FEATURE_NAME_MARKER, '').trim());
  }
}
