export interface CodeComment {
  targetType: 'class' | 'method' | 'unknown';
  targetName: string | undefined;
  targetLine: number;
  targetFilePath: string;
  lines: string[];
}
