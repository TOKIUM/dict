import { exit } from 'process';
import { CodeCommentParser } from '../parser/CodeCommentParser';
import { CodeLanguage } from '../parser/CodeLanguage';
import { CodeText } from '../parser/CodeText';
import { Dictionary } from '../dictionary/Dictionary';
import { listFiles } from '../util/files';
import { DictionaryExporter } from '../exporter/DictionaryExporter';
import { Format } from '../exporter/Format';

export class Generate {
  static async execute(
    args: string[],
  ): Promise<void> {
    const format = Format.from(args[0]);
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

    const documentExporter = DictionaryExporter.from(format);
    await documentExporter.export(outputs);
    exit(0);
  }
}
