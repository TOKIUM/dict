import { DictionaryFeature } from './DictionaryFeature';
import { DictionaryFeatureDescription } from './DictionaryFeatureDescription';
import { DictionaryFeatureName } from './DictionaryFeatureName';
import { DictionaryTarget } from './DictionaryTarget';

describe('DictionaryFeature', () => {

  describe('fromLines', () => {
    it('should return undefined if no name and no description', () => {
      const target = new DictionaryTarget('User', 'class', 1, 'app/models/user.rb');
      const lines = [];
      const actual = DictionaryFeature.fromLines(target, lines);
      expect(actual).toBeUndefined();
    });
    it('should return a DictionaryFeature if no name', () => {
      const target = new DictionaryTarget('User', 'class', 1, 'app/models/user.rb');
      const lines = ['@dict-feature-desc Create user description'];
      const actual = DictionaryFeature.fromLines(target, lines);
      expect(actual).toBeUndefined();
    });
    it('should return a DictionaryFeature if name and description', () => {
      const target = new DictionaryTarget('User', 'class', 1, 'app/models/user.rb');
      const lines = ['@dict-feature-name Create user', '@dict-feature-desc Create user description'];
      const actual = DictionaryFeature.fromLines(target, lines);
      expect(actual).toBeDefined();
    });
    it('should return a DictionaryFeature if description and parent', () => {
      const target = new DictionaryTarget('User', 'class', 1, 'app/models/user.rb');
      const lines = ['@dict-feature-desc Create user description'];
      const parent = new DictionaryFeature(new DictionaryFeatureName(target, 'Create user'), [new DictionaryFeatureDescription(target, 'Create user description')]);
      const actual = DictionaryFeature.fromLines(target, lines, parent);
      expect(actual).toBeDefined();
    });
  });
});
