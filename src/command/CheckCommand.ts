import { CodeCommentParser } from '../core/code/CodeCommentParser';
import { CodeText } from '../core/code/CodeText';
import { Dictionary } from '../core/dictionary/Dictionary';
import { listFiles } from '../util/files';

export class CheckCommand {
  static async execute(
    types: string[],
    inputFilePaths: string[],
  ): Promise<number> {
    const extractedPaths = inputFilePaths.flatMap(listFiles);
    const texts = await Promise.all(extractedPaths.map(filepath => CodeText.from(filepath)));

    const outputs = texts.flatMap((text) => {
      const comments = CodeCommentParser.parse(text.filepath, text.lines);
      return comments.filter(comment => {
        return comment.targetType !== undefined && types.includes(comment.targetType) && !Dictionary.fromComment(comment);
      });
    });

    if (outputs.length === 0) {
      console.log('All dictionaries found.');
      return 0;
    }

    console.log('No dictionaries found:');
    outputs.forEach((output) => {
      console.log(`${output.targetFilePath} [${output.targetType}] ${output.targetName}`);
    });
    return 1;
  }
}
