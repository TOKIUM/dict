import { Dictionary } from '../../core/dictionary/Dictionary';
import { DictionaryDescription } from '../../core/dictionary/DictionaryDescription';
import { DictionaryFeature } from '../../core/dictionary/DictionaryFeature';
import { DictionaryFeatureDescription } from '../../core/dictionary/DictionaryFeatureDescription';
import { DictionaryFeatureName } from '../../core/dictionary/DictionaryFeatureName';
import { DictionaryName } from '../../core/dictionary/DictionaryName';
import { DictionaryTarget } from '../../core/dictionary/DictionaryTarget';
import { MarkdownFormat } from './MarkdownFormat';

describe('MarkdownFormat', () => {
  describe('format', () => {
    it ('should return a string', () => {
      const target = new DictionaryTarget('User', 'class', 1, 'app/models/user.rb');
      const name = new DictionaryName(target, 'User');
      const desc = [new DictionaryDescription(target, 'This is a user dictionary.')];
      const featureName = new DictionaryFeatureName(target, 'create');
      const featureDesc = new DictionaryFeatureDescription(target, 'Create a user.');
      const feature = new DictionaryFeature(featureName, [featureDesc]);
      const dictionary = new Dictionary(name, undefined, [], desc, [feature]);
      const expected = '# User\nThis is a user dictionary.';
      const actual = new MarkdownFormat().format(dictionary);
      expect(actual).toEqual(expected);
    });
  });
});
