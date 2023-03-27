import { exit } from 'process';
import { CodeCommentParser } from '../parser/CodeCommentParser';
import { CodeLanguage } from '../parser/CodeLanguage';
import { CodeText } from '../parser/CodeText';
import { Dictionary } from '../dictionary/Dictionary';
import { listFiles } from '../util/files';
import { DictionaryFormatter } from '../formatter/DictionaryFormatter';
import { Format } from '../formatter/Format';

export class Generate {
  static async execute(
    filePaths: string[],
  ): Promise<void> {
    const extractedPaths  = filePaths.flatMap(listFiles);
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

    const format = Format.from('md'); // 現状はmarkdownしかないので固定
    const documentFormatter = DictionaryFormatter.from(format);
    const formatted = documentFormatter.format(outputs);

    console.log(formatted);
    exit(0);
  }
}
