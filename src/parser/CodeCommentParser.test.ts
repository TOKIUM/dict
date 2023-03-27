import { RubyCodeCommentParser } from './CodeCommentParser';

describe('RubyCodeCommentParser', () => {
  describe('parse', () => {
    it('returns comments', () => {
      const parser = new RubyCodeCommentParser();
      const text =
`
# frozen_string_literal: true

# module comment 1
# module comment 2
module A
  # class comment 1
  # class comment 2
  class AA
    # method comment 1
    # method comment 2
    def foo
      puts 'foo'
    end

    class << self
      def bar
        puts 'bar'
      end
    end
  end
end

# class comment 3
class B
end

class C
end
`;
      const lines = text.split('\n').map(line => line.trim());
      const comments = parser.parse('example.rb', lines);
      expect(comments).toEqual([
        { targetType: 'class', targetName: 'AA', lines: ['class comment 1', 'class comment 2'], targetFilePath: 'example.rb', targetLine: 8 },
        { targetType: 'class', targetName: 'B', lines: ['class comment 3'], targetFilePath: 'example.rb', targetLine: 24 },
        { targetType: 'class', targetName: 'C', lines: [], targetFilePath: 'example.rb', targetLine: 27 },
      ]);
    });
  });
});