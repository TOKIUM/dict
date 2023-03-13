import { CodeLanguage } from './CodeLanguage';
import { CodeComment } from './CodeComment';

interface CodeCommentParser {
  parse(lines: string[]): CodeComment[];
}

export class RubyCodeCommentParser implements CodeCommentParser {
  parse(lines: string[]): CodeComment[] {
    const result = lines.reduce((acc, line) => {
      // ignore empty line
      if (line.length === 0) return acc;
      // ignore singleton class extension
      if (line.startsWith('class << self')) return { accComments: acc.accComments, accLines: [] };

      // accumulate comments
      if (line.startsWith('#')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^#/, '').trim()] };

      if (line.startsWith('class ')) return { accComments: [...acc.accComments, { targetType: 'class', targetName: line.split(' ')[1], lines: acc.accLines }], accLines: [] };
      return { accComments: acc.accComments, accLines: [] };
    }, { accComments: [], accLines: [] });

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
