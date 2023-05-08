import { DictionaryFeatureName } from './DictionaryFeatureName';
import { DictionaryTarget } from './DictionaryTarget';

describe('DictionaryFeatureName', () => {
  describe('fromLines', () => {
    const target = new DictionaryTarget('User', 'class', 1, 'user.rb');
    it('return undefined when no feature name', () => {
      const actual = DictionaryFeatureName.fromLines(target, []);
      expect(actual).toEqual(undefined);
    });
    it('return feature name when feature name', () => {
      const actual = DictionaryFeatureName.fromLines(target, ['@dict-feature-name User feature']);
      expect(actual).toEqual(new DictionaryFeatureName(target, 'User feature'));
    });
  });
});
