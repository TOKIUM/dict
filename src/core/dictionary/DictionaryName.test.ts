import { DictionaryName } from './DictionaryName';
import { DictionaryTarget } from './DictionaryTarget';

describe('DictionaryName', () => {
  describe('fromLines', () => {
    it('return undefined when no name', () => {
      const actual = DictionaryName.fromLines(new DictionaryTarget('User', 'class', 1, 'user.rb'), []);

      expect(actual).toEqual(undefined);
    });
    it('return name when name', () => {
      const actual = DictionaryName.fromLines(new DictionaryTarget('User', 'class', 1, 'user.rb'), ['@dict-name User']);

      expect(actual).toEqual(new DictionaryName(new DictionaryTarget('User', 'class', 1, 'user.rb'), 'User'));
    });
  });
});
