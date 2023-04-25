import { DictionaryDescription } from './DictionaryDescription';
import { DictionaryTarget } from './DictionaryTarget';

describe('DictionaryDescription', () => {
  describe('fromLines', () => {
    it('return empty array when no description', () => {
      const actual = DictionaryDescription.fromLines(new DictionaryTarget('User', 'class', 1, 'user.rb'), []);

      expect(actual).toEqual([]);
    });

    it('return description when description', () => {
      const actual = DictionaryDescription.fromLines(new DictionaryTarget('User', 'class', 1, 'user.rb'), ['@dict-name User', '@dict-desc User description']);

      expect(actual).toEqual([new DictionaryDescription(new DictionaryTarget('User', 'class', 1, 'user.rb'), 'User description')]);
    });
  });
});
