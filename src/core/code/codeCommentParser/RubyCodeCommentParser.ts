import { CodeComment } from '../CodeComment';
import { CodeCommentParser } from '../CodeCommentParser';

export class RubyCodeCommentParser implements CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[] {
    const result = lines.reduce((acc, line, index) => {
      // accumulate comments
      if (line.startsWith('#')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^#/, '').trim()] };

      // ignore empty line
      if (line.startsWith('class ') && !line.startsWith('class << self')) {
        const newComment: CodeComment = { targetType: 'class', targetName: line.split(' ')[1], lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }

      if (line.startsWith('def ')) {
        const newComment: CodeComment = { targetType: 'method', targetName: line.split(' ')[1].split('(')[0], lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }
      
      if (acc.accLines.length > 0 ) {
        const newComment: CodeComment = { targetType: 'unknown', targetName: undefined, lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }

      return { accComments: acc.accComments, accLines: [] };
    }, { accComments: [] as CodeComment[], accLines: [] as string[] });

    return result.accComments;
  }
}
