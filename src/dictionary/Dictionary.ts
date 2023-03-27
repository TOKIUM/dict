import { CodeComment } from '../parser/CodeComment';
import { DictionaryDescription } from './DictionaryDescription';
import { DictionaryName } from './DictionaryName';

export class Dictionary {
  constructor(
    public targetName: string,
    public targetType: 'class',
    public targetLine: number,
    public targetFilePath: string,
    public name: DictionaryName,
    public description: DictionaryDescription,
  ) {}

  static fromComment(comment: CodeComment): Dictionary | undefined {
    const { targetName, targetType, targetLine, targetFilePath } = comment;
    const dictionaryName = DictionaryName.fromLines(comment.lines);
    const dictionaryDescription = DictionaryDescription.fromLines(comment.lines);

    if (!dictionaryName || !dictionaryDescription) {
      return undefined;
    }

    return new Dictionary(targetName, targetType, targetLine, targetFilePath, dictionaryName, dictionaryDescription);
  }
}
