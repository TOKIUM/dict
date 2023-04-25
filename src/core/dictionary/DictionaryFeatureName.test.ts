import { DictionaryFeatureName } from './DictionaryFeatureName';
import { DictionaryTarget } from './DictionaryTarget';

describe('DictionaryFeatureName', () => {
  describe('fromLines', () => {
    it('return undefined when no feature name', () => {
      const actual = DictionaryFeatureName.fromLines([]);
      expect(actual).toEqual(undefined);
    });
    it('return feature name when feature name', () => {
      const actual = DictionaryFeatureName.fromLines(['@dict-feature-name User feature']);
      expect(actual).toEqual(new DictionaryFeatureName('User feature'));
    });
  });
});
