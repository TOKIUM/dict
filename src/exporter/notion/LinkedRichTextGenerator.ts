import { LinkedDictionaryName } from './LinkedDictionaryName';

// NotionのRichTextの型 notion側からはexportされてないので、自前で定義する
type LinkedRichText = {
  type: 'text';
  text: { content: string; link: { url: string } | null };
  annotations?: { bold?: boolean };
} 

function noLinkedRichText(text: string): LinkedRichText {
  return { type: 'text', text: { content: text, link: null }, annotations: { bold: false } };
}

function linkedRichText(text: string, url: string): LinkedRichText {
  return { type: 'text', text: { content: text, link: { url } }, annotations: { bold: true } };
}

export class LinkedRichTextGenerator {
  /**
   * 与えられた文字列の中で、辞書名が含まれている部分をリンク付きのRichTextに変換する
   * 例えば、「経費は従業員によって登録されました。従業員によって承認されます」という文字列と「ユーザー」の辞書が「従業員」の別名で与えられた時、
   * 最初に現れた「従業員」の部分だけを「ユーザー」辞書へのリンク付きRichTextに変換する
   * @param text リンク付きリッチテキストに変換するテキスト 今は説明文を想定
   * @param dictNames 変換に含める複数の辞書名
   * @returns リンク付きリッチテキスト
   */
  static from(text: string, dictNames: LinkedDictionaryName[]): LinkedRichText[] {
    const initial: LinkedRichText[] = [noLinkedRichText(text)];

    return dictNames.reduce<LinkedRichText[]>((linkedTexts, dictName) => {
      const result: LinkedRichText[] = linkedTexts.flatMap((linkedText) => {
        if (linkedText.text.link !== null) return [linkedText];

        const splitted = linkedText.text.content.split(dictName.name);
        if (splitted.length === 1) return [linkedText];

        const linkBlock = linkedRichText(dictName.name, dictName.link);

        return splitted.flatMap((text, index) => {
          // 最初に見つけた部分だけをリンクにする
          if (index === 0) return [noLinkedRichText(text)];
          if (index === 1) return [linkBlock, noLinkedRichText(text)];
          return [noLinkedRichText(dictName.name), noLinkedRichText(text)];
        });
      });
      
      return result;
    }, initial)
  }
}
