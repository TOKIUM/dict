import { DictionaryAlias } from './DictionaryAlias';

describe('DictionaryAlias', () => {
  describe('fromLines', () => {
    it('return empty array when not found', () => {
      const actual = DictionaryAlias.fromLines(['']);
      expect(actual).toEqual([]);
    });

    it('return empty array when not found', () => {
      const actual = DictionaryAlias.fromLines(['@dict-alias user']);
      expect(actual).toEqual([new DictionaryAlias('user')]);
    });
  });
});
