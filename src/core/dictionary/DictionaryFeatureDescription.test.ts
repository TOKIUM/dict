import { DictionaryFeatureDescription } from './DictionaryFeatureDescription';

describe('DictionaryFeatureDescription', () => {
  describe('fromLines', () => {
    it('return empty array when no description', () => {
      const actual = DictionaryFeatureDescription.fromLines([]);

      expect(actual).toEqual([]);
    });

    it('return description when description', () => {
      const actual = DictionaryFeatureDescription.fromLines(['@dict-feature-desc User feature description']);

      expect(actual).toEqual([new DictionaryFeatureDescription('User feature description')]);
    });
  });
});
