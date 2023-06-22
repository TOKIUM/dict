import { DictionaryGroup } from './DictionaryGroup';

describe('DictionaryGroup', () => {
  describe('fromLines', () => {
    it('return undefined when no group', () => {
      const actual = DictionaryGroup.fromLines([]);

      expect(actual).toEqual(undefined);
    });
    it('return group when group', () => {
      const actual = DictionaryGroup.fromLines(['@dict-group Organization']);

      expect(actual).toEqual(new DictionaryGroup('Organization'));
    });
  });
});
