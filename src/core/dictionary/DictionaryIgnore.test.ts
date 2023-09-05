import { CodeComment } from '../code';
import { DictionaryIgnore } from './DictionaryIgnore';

describe('DictionaryIgnore', () => {
  describe('fromComment', () => {
    it('return undefined when ignore', () => {
      const comment: CodeComment = {
        targetName: 'User',
        targetType: 'class',
        targetLine: 1,
        targetFilePath: 'src/User.ts',
        lines: ['@dict-ignore'],
      };
      const actual = DictionaryIgnore.fromComment(comment);

      expect(actual).not.toBeUndefined();
    });
    it('return group when no ignore', () => {
      const comment: CodeComment = {
        targetName: 'User',
        targetType: 'class',
        targetLine: 1,
        targetFilePath: 'src/User.ts',
        lines: ['@dict-group Organization'],
      };
      const actual = DictionaryIgnore.fromComment(comment);

      expect(actual).toEqual(undefined);
    });
  });
});
