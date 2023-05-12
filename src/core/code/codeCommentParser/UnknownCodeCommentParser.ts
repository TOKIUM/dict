import { CodeComment } from '../CodeComment';
import { CodeCommentParser } from '../CodeCommentParser';

export class UnknownCodeCommentParser implements CodeCommentParser {
  parse(filePath: string, lines: string[]): CodeComment[] {
    return [];
  }
}
