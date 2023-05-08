import { DictionaryFeatureDescription } from './DictionaryFeatureDescription';
import { DictionaryFeatureName } from './DictionaryFeatureName';
import { DictionaryTarget } from './DictionaryTarget';

export class DictionaryFeature {
  constructor(
    public name: DictionaryFeatureName,
    public descriptions: DictionaryFeatureDescription[],
  ) {}

  static fromLines(target: DictionaryTarget, lines: string[], parent?: DictionaryFeature): DictionaryFeature | undefined {
    const name = DictionaryFeatureName.fromLines(target, lines) ?? parent?.name;
    const desc = DictionaryFeatureDescription.fromLines(target, lines);

    if (name === undefined) return undefined; 

    return new DictionaryFeature(name, desc);
  }

  static mergeAll(features: DictionaryFeature[]): DictionaryFeature[] {
    const result: DictionaryFeature[] = features.reduce(
      (prev, curr) => {
        const foundIndex = prev.findIndex((p) => p.name.value === curr.name.value);

        if (foundIndex < 0) return prev.concat(curr);

        const found = prev[foundIndex];
        const merged = found ? found.merge(curr) : curr;
        prev[foundIndex] = merged;

        return prev;
      },
      [] as DictionaryFeature[],
    );

    return result;
  }

  merge(right: DictionaryFeature): DictionaryFeature {
    const mergedDescriptions = this.descriptions.concat(right.descriptions);
    return new DictionaryFeature(this.name, mergedDescriptions);
  }
}
