import { CodeLanguage } from './CodeLanguage';

describe('CodeLanguage', () => {
  describe('from', () => {
    it('returns Ruby', () => {
      expect(CodeLanguage.from('foo.rb')).toEqual('Ruby');
    });

    it ('throws an error', () => {
      expect(CodeLanguage.from('foo.bar')).toEqual('Unknown');
    });
  });
});
