import { CodeCommentParser } from '../core/code/CodeCommentParser';
import { CodeText } from '../core/code/CodeText';
import { Dictionary } from '../core/dictionary/Dictionary';
import { DictionaryIgnore } from '../core/dictionary/DictionaryIgnore';
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
      const dicts = Dictionary.fromComments(comments);
      const descTargets = dicts.flatMap((dict) => dict.descriptions.map((desc) => desc.target.targetLine));
      const featureDescTargets = dicts.flatMap((dict) => dict.features.flatMap((feature) => feature.descriptions.map((desc) => desc.target.targetLine)));
      const ignores = DictionaryIgnore.fromComments(comments);
      const ignoreTargets = ignores.flatMap((ignore) => ignore.target.targetLine);

      return comments.filter((comment) => {
        if (comment.targetType === undefined) { return false; }
        if (!types.includes(comment.targetType)) { return false; }
        if (ignoreTargets.includes(comment.targetLine)) { return false; }

        const found = descTargets.includes(comment.targetLine) || featureDescTargets.includes(comment.targetLine);

        return !found;
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
