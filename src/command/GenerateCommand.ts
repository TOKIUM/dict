import { exit } from 'process';
import { CodeCommentParser } from '../core/code/CodeCommentParser';
import { CodeLanguage } from '../core/code/CodeLanguage';
import { CodeText } from '../core/code/CodeText';
import { Dictionary } from '../core/dictionary/Dictionary';
import { listFiles } from '../util/files';
import { Output } from '../output/Output';

export class GenerateCommand {
  static async execute(
    args: string[],
  ): Promise<void> {
    const format = args[0];
    const filePaths = args.slice(1);
    const extractedPaths = filePaths.flatMap(listFiles);
    const texts = await Promise.all(extractedPaths.map(filepath => CodeText.from(filepath)));

    const outputs = texts.flatMap((text) => {
      const language = CodeLanguage.from(text.filepath);
      const parser = CodeCommentParser.from(language);
      const comments = parser.parse(text.filepath, text.lines);
      const dicts = comments.map(comment => Dictionary.fromComment(comment)).filter((dict) => dict !== undefined)
      return dicts;
    });

    if (outputs.length === 0) {
      console.log('No dictionaries found.');
      exit(1);
    }

    const output = Output.from(format);
    await output.exec(outputs);
    exit(0);
  }
}
