import { exit } from 'process';
import { CodeCommentParser } from '../core/code/CodeCommentParser';
import { CodeLanguage } from '../core/code/CodeLanguage';
import { CodeText } from '../core/code/CodeText';
import { Dictionary } from '../core/dictionary/Dictionary';
import { listFiles } from '../util/files';

export class CheckCommand {
  static async execute(
    filePaths: string[],
  ): Promise<void> {
    const extractedPaths  = filePaths.flatMap(listFiles);
    const texts = await Promise.all(extractedPaths.map(filepath => CodeText.from(filepath)));

    const outputs = texts.flatMap((text) => {
      const language = CodeLanguage.from(text.filepath);
      const parser = CodeCommentParser.from(language);
      const comments = parser.parse(text.filepath, text.lines);
      return comments.filter(comment => !Dictionary.fromComment(comment));
    });

    if (outputs.length === 0) {
      console.log('All dictionaries found.');
      exit(0);
    }

    console.log('No dictionaries found:');
    outputs.forEach((output) => {
      console.log(`${output.targetFilePath} [${output.targetType}] ${output.targetName}`);
    });
    exit(1);
  }
}
