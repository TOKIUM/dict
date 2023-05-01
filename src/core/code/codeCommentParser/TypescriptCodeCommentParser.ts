import { CodeComment } from '../CodeComment';
import { CodeCommentParser } from '../CodeCommentParser';

export class TypescriptCodeCommentParser implements CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[] {
    const results = lines.reduce((acc, line, index) => {
      // accumulate comments
      if (line.startsWith('//')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^\/\//, '').trim()] };
      if (line.startsWith('/**')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^\/\**/, '').trim()] };
      if (line.startsWith('/*')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^\/\*/, '').trim()] };
      if (line.startsWith('* ')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/^\*/, '').trim()] };
      if (line.startsWith('*/')) return { accComments: acc.accComments, accLines: [...acc.accLines, line.replace(/\*\/$/, '').trim()] };

      // ignore constructor
      if (line.startsWith('constructor')) return { accComments: acc.accComments, accLines: [] };

      if (line.startsWith('class ') || line.includes(' class ')) {
        const className = line.split('class ')[1].split(' ')[0];
        const newComment: CodeComment = { targetType: 'class', targetName: className, lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }

      if (line.includes('function ') && line.includes('(')) {
        const methodName = line.split('function ')[1].split('(')[0];
        const newComment: CodeComment = { targetType: 'method', targetName: methodName, lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }

      if (acc.accLines.length > 0 ) {
        const newComment: CodeComment = { targetType: 'unknown', targetName: undefined, lines: acc.accLines, targetLine: index, targetFilePath: filePath };
        return { accComments: [...acc.accComments, newComment], accLines: [] };
      }

      return { accComments: acc.accComments, accLines: [] };
    }, { accComments: [] as CodeComment[], accLines: [] as string[] });
    
    return results.accComments;
  }
}
