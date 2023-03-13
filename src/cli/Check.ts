import { exit } from 'process';
import { CodeCommentParser } from '../parser/CodeCommentParser';
import { CodeLanguage } from '../parser/CodeLanguage';
import { CodeText } from '../parser/CodeText';
import { Dictionary } from '../dictionary/Dictionary';
import { listFiles } from '../util/files';

export class Check {
  static async execute(
    filePaths: string[],
  ): Promise<void> {
    const extractedPaths  = filePaths.flatMap(listFiles);
    const texts = await Promise.all(extractedPaths.map(filepath => CodeText.from(filepath)));

    const outputs = texts.flatMap((text) => {
      const language = CodeLanguage.from(text.filepath);
      const parser = CodeCommentParser.from(language);
      const comments = parser.parse(text.lines);
      const noDicts = comments.filter(comment => !Dictionary.fromLines(comment.lines));
      return noDicts.map((n) => ({ filePath: text.filepath, targetType: n.targetType, targetName: n.targetName }));
    });

    console.log('No dictionaries found:');
    outputs.forEach((output) => {
      console.log(`${output.filePath} [${output.targetType}] ${output.targetName}`);
    });
  }
}
