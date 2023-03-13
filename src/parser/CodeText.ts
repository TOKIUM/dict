import * as fs from 'fs';

interface CodeText {
  filepath: string;
  lines: string[];
}

export const CodeText = {
  async from(filepath: string): Promise<CodeText> {
    const text = fs.readFileSync(filepath, 'utf8'); 
    const lines = text.split('\n');
    const normalizedLines = lines.map(line => line.trim());
    return {
      filepath,
      lines: normalizedLines,
    };
  }
};
