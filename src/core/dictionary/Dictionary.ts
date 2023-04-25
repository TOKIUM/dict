import { CodeComment } from '../code/CodeComment';
import { DictionaryDescription } from './DictionaryDescription';
import { DictionaryName } from './DictionaryName';
import { DictionaryFeature } from './DictionaryFeature';
import { DictionaryTarget } from './DictionaryTarget';
import { DictionaryAlias } from './DictionaryAlias';

export class Dictionary {
  constructor(
    public name: DictionaryName,
    public alias: DictionaryAlias[],
    public descriptions: DictionaryDescription[],
    public features: DictionaryFeature[],
  ) {}

  merge(right: Dictionary): Dictionary {
    const mergedAlias = this.alias.concat(right.alias);
    const mergedDescription = this.descriptions.concat(right.descriptions);
    const mergedFeatures = this.features.concat(right.features);

    return new Dictionary(this.name, mergedAlias, mergedDescription, mergedFeatures);
  }

  static fromComment(comment: CodeComment): Dictionary | undefined {
    const { targetName, targetType, targetLine, targetFilePath } = comment;
    const dictionaryTarget = new DictionaryTarget(targetName, targetType, targetLine, targetFilePath);
    const dictionaryName = DictionaryName.fromLines(comment.lines);
    const dictionaryAlias = DictionaryAlias.fromLines(comment.lines);
    const dictionaryDescription = DictionaryDescription.fromLines(dictionaryTarget, comment.lines);
    const dictioanryFeature = DictionaryFeature.fromLines(dictionaryTarget, comment.lines);

    if (!dictionaryName) { return undefined; }

    return new Dictionary(dictionaryName, dictionaryAlias, dictionaryDescription, dictioanryFeature !== undefined ? [dictioanryFeature] : []);
  }

  static mergeAll(dictionaries: Dictionary[]): Dictionary[] {
    const result: Dictionary[] = dictionaries.reduce(
      (prev, curr) => {
        const foundIndex = prev.findIndex((p) => p.name.value === curr.name.value);

        if (foundIndex < 0) return prev.concat(curr);

        const found = prev[foundIndex];
        const merged = found ? found.merge(curr) : curr;
        prev[foundIndex] = merged;

        return prev;
      },
      [],
    );

    return result;
  }
}
