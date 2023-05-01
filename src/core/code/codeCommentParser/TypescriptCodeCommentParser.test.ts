import { TypescriptCodeCommentParser } from './TypescriptCodeCommentParser';

describe('TypescriptCodeCommentParser', () => {
  describe('parse', () => {
    it('returns comments', () => {
      const parser = new TypescriptCodeCommentParser();
      const text =
`
// class comment 1
class A {
  constructor() {}
}

/**
 * method comment 1
 * method comment 2
*/
function B() {}


/**
 * class comment 3
*/
export class C {}


// method comment 4
export function D() {}
`;

      const lines = text.split('\n').map(line => line.trim());
      const comments = parser.parse('example.ts', lines);
      expect(comments).toEqual([
        { targetType: 'class', targetName: 'A', lines: ['class comment 1'], targetFilePath: 'example.ts', targetLine: 2 },
        { targetType: 'method', targetName: 'B', lines: ['', 'method comment 1', 'method comment 2', ''], targetFilePath: 'example.ts', targetLine: 10 },
        { targetType: 'class', targetName: 'C', lines: ['', 'class comment 3', ''], targetFilePath: 'example.ts', targetLine: 16 },
        { targetType: 'method', targetName: 'D', lines: ['method comment 4'], targetFilePath: 'example.ts', targetLine: 20 },
      ]);
    });
  });
});
