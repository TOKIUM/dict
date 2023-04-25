export interface CodeComment {
  targetType: 'class' | 'method';
  targetName: string;
  targetLine: number;
  targetFilePath: string;
  lines: string[];
}
