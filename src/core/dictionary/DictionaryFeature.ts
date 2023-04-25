import { DictionaryFeatureDescription } from './DictionaryFeatureDescription';
import { DictionaryFeatureName } from './DictionaryFeatureName';
import { DictionaryTarget } from './DictionaryTarget';

export class DictionaryFeature {
  constructor(
    public target: DictionaryTarget,
    public name: DictionaryFeatureName,
    public descriptions: DictionaryFeatureDescription[],
  ) {}

  static fromLines(target: DictionaryTarget, lines: string[]): DictionaryFeature | undefined {
    const name = DictionaryFeatureName.fromLines(lines);
    const desc = DictionaryFeatureDescription.fromLines(lines);

    if (name === undefined) return undefined; 

    return new DictionaryFeature(target, name, desc);
  }
}
