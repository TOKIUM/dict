import { CodeLanguage } from './CodeLanguage';
import { CodeComment } from './CodeComment';

interface CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[];
}

export class RubyCodeCommentParser implements CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[] {
    const result = lines.reduce((acc, line, index) => {
      // ignore empty line
      if (line.length === 0) return acc;
      // ignore singleton class extension
      if (line.startsWith('class << self')) return { accComments: acc.accComments, accLines: [] };

      // accumulate comments
      if (line.startsWith('#')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^#/, '').trim()] };

      if (line.startsWith('class ')) {
        const newComment: CodeComment = { targetType: 'class', targetName: line.split(' ')[1], lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }
      return { accComments: acc.accComments, accLines: [] };
    }, { accComments: [] as CodeComment[], accLines: [] as string[] });

    return result.accComments;
  }
}

export const CodeCommentParser = {
  from(language: CodeLanguage): CodeCommentParser {
    switch (language) {
      case 'Ruby':
        return new RubyCodeCommentParser();
      default:
        throw new Error(`Unknown language: ${language}`);
    }
  }
};
