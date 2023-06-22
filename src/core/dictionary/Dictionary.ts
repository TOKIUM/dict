import { CodeComment } from '../code/CodeComment';
import { DictionaryDescription } from './DictionaryDescription';
import { DictionaryName } from './DictionaryName';
import { DictionaryFeature } from './DictionaryFeature';
import { DictionaryTarget } from './DictionaryTarget';
import { DictionaryAlias } from './DictionaryAlias';
import { DictionaryGroup } from './DictionaryGroup';

export class Dictionary {
  constructor(
    public name: DictionaryName,
    public group: DictionaryGroup | undefined,
    public alias: DictionaryAlias[],
    public descriptions: DictionaryDescription[],
    public features: DictionaryFeature[],
  ) {}

  static fromComment(comment: CodeComment, parent?: Dictionary): Dictionary | undefined {
    const { targetName, targetType, targetLine, targetFilePath } = comment;
    const dictionaryTarget = new DictionaryTarget(targetName, targetType, targetLine, targetFilePath);
    const dictionaryName = DictionaryName.fromLines(dictionaryTarget, comment.lines) ?? parent?.name;
    const dictionaryGroup = DictionaryGroup.fromLines(comment.lines);
    const dictionaryAlias = DictionaryAlias.fromLines(comment.lines);
    const dictionaryDescription = DictionaryDescription.fromLines(dictionaryTarget, comment.lines);
    const parentFeature = (parent?.features.length > 0 && dictionaryName.value === parent?.name.value) ? parent?.features[parent.features.length - 1] : undefined;
    const dictionaryFeature = DictionaryFeature.fromLines(dictionaryTarget, comment.lines, parentFeature);

    if (!dictionaryName) { return undefined; }

    return new Dictionary(dictionaryName, dictionaryGroup, dictionaryAlias, dictionaryDescription, dictionaryFeature !== undefined ? [dictionaryFeature] : []);
  }

  static fromComments(comments: CodeComment[]): Dictionary[] {
    return comments.reduce((acc, curr) => {
      const previous = acc.length > 0 ? acc[acc.length - 1] : undefined; 
      const current = Dictionary.fromComment(curr, previous);
      return current ? acc.concat(current) : acc;
    }, []);
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
      [] as Dictionary[],
    );

    return result;
  }

  merge(right: Dictionary): Dictionary {
    const mergedAlias = this.alias.concat(right.alias);
    const mergedDescription = this.descriptions.concat(right.descriptions);
    const mergedFeatures = DictionaryFeature.mergeAll(this.features.concat(right.features));

    return new Dictionary(this.name, this.group, mergedAlias, mergedDescription, mergedFeatures);
  }
}
