import { DictionaryName } from './DictionaryName';

describe('DictionaryName', () => {
  describe('fromLines', () => {
    it('return undefined when no name', () => {
      const actual = DictionaryName.fromLines([]);

      expect(actual).toEqual(undefined);
    });
    it('return name when name', () => {
      const actual = DictionaryName.fromLines(['@dict-name User']);

      expect(actual).toEqual(new DictionaryName('User'));
    });
  });
});
