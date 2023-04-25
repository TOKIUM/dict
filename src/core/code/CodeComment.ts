export interface CodeComment {
  targetType: 'class';
  targetName: string;
  targetLine: number;
  targetFilePath: string;
  lines: string[];
}
