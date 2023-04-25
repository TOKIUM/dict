import { CodeLanguage } from './CodeLanguage';
import { CodeComment } from './CodeComment';
import { RubyCodeCommentParser } from './codeCommentParser/RubyCodeCommentParser';
import { parse } from 'path';

export interface CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[];
}

export const CodeCommentParser = {
  from(language: CodeLanguage): CodeCommentParser {
    switch (language) {
      case 'Ruby':
        return new RubyCodeCommentParser();
      default:
        throw new Error(`Unknown language: ${language}`);
    }
  },
  parse(filePath: string, lines: string[]): CodeComment[] {
    const language = CodeLanguage.from(filePath);
    const parser = CodeCommentParser.from(language);
    return parser.parse(filePath, lines);
  }
};
