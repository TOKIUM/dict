import { CodeLanguage } from './CodeLanguage';
import { CodeComment } from './CodeComment';
import { RubyCodeCommentParser } from './codeCommentParser/RubyCodeCommentParser';
import { TypescriptCodeCommentParser } from './codeCommentParser/TypescriptCodeCommentParser';
import { UnknownCodeCommentParser } from './codeCommentParser/UnknownCodeCommentParser';

export interface CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[];
}

export const CodeCommentParser = {
  from(language: CodeLanguage): CodeCommentParser {
    switch (language) {
      case 'Ruby':
        return new RubyCodeCommentParser();
      case 'Typescript':
        return new TypescriptCodeCommentParser();
      default:
        return new UnknownCodeCommentParser();
    }
  },
  parse(filePath: string, lines: string[]): CodeComment[] {
    const language = CodeLanguage.from(filePath);
    const parser = CodeCommentParser.from(language);
    return parser.parse(filePath, lines);
  }
};
