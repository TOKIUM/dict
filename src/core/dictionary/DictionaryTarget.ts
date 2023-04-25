export class DictionaryTarget {
  constructor(
    public targetName: string,
    public targetType: 'class' | 'method',
    public targetLine: number,
    public targetFilePath: string,
  ) {}
}
