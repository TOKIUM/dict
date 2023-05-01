import { CodeCommentParser } from '../core/code/CodeCommentParser';
import { CodeText } from '../core/code/CodeText';
import { Dictionary } from '../core/dictionary/Dictionary';
import { listFiles } from '../util/files';
import { Output } from '../output/Output';

export class GenerateCommand {
  static async execute(
    format: string,
    inputFilePaths: string[],
    outputFilePath: string | undefined,
  ): Promise<number> {
    const extractedPaths = inputFilePaths.flatMap(listFiles);
    const texts = await Promise.all(extractedPaths.map(filepath => CodeText.from(filepath)));

    const outputs = texts.flatMap((text) => {
      const comments = CodeCommentParser.parse(text.filepath, text.lines);
      const dicts = Dictionary.fromComments(comments).filter((dict) => dict !== undefined);
      return dicts;
    });

    const merged = Dictionary.mergeAll(outputs);

    if (merged.length === 0) {
      console.log('No dictionaries found.');
      return 1;
    }

    const output = Output.from(format, outputFilePath);
    await output.exec(merged);
    return 0;
  }
}
