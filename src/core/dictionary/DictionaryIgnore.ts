import { CodeComment } from '../code/CodeComment';
import { DictionaryTarget } from './DictionaryTarget';

const IGNORE_MARKER = '@dict-ignore';

export class DictionaryIgnore {
  constructor(
    public readonly target: DictionaryTarget,
  ) {}

  static fromComment(comment: CodeComment): DictionaryIgnore | undefined {
    const found = comment.lines.find(line => line.startsWith(IGNORE_MARKER));
    if (!found) return undefined;

    const { targetName, targetType, targetLine, targetFilePath } = comment;
    const dictionaryTarget = new DictionaryTarget(targetName, targetType, targetLine, targetFilePath);

    return new DictionaryIgnore(dictionaryTarget);
  }

  static fromComments(comments: CodeComment[]): DictionaryIgnore[] {
    return comments.reduce((acc, curr) => {
      const current = DictionaryIgnore.fromComment(curr);
      return current ? acc.concat(current) : acc;
    }, []);
  }
}