import { DictionaryFeatureDescription } from './DictionaryFeatureDescription';
import { DictionaryTarget } from './DictionaryTarget';

describe('DictionaryFeatureDescription', () => {
  describe('fromLines', () => {
    const target = new DictionaryTarget('User', 'class', 1, 'user.rb');
    it('return empty array when no description', () => {
      const actual = DictionaryFeatureDescription.fromLines(target, []);

      expect(actual).toEqual([]);
    });

    it('return description when description', () => {
      const actual = DictionaryFeatureDescription.fromLines(target, ['@dict-feature-desc User feature description']);

      expect(actual).toEqual([new DictionaryFeatureDescription(target, 'User feature description')]);
    });
  });
});
