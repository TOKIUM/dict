import { LinkedDictionaryName } from './LinkedDictionaryName';

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
  static from(text: string, dictNames: LinkedDictionaryName[]): LinkedRichText[] {
    const initial: LinkedRichText[] = [noLinkedRichText(text)];

    return dictNames.reduce<LinkedRichText[]>((linkedTexts, dictName) => {
      const result: LinkedRichText[] = linkedTexts.flatMap((linkedText) => {
        if (linkedText.text.link !== null) return [linkedText];

        const splitted = linkedText.text.content.split(dictName.name);
        if (splitted.length === 1) return [linkedText];

        const linkBlock = linkedRichText(dictName.name, dictName.link);

        return splitted.flatMap((text, index) => {
          if (index === 0) return [noLinkedRichText(text)];
          if (index === 1) return [linkBlock, noLinkedRichText(text)];
          return [noLinkedRichText(dictName.name), noLinkedRichText(text)];
        });
      });
      
      return result;
    }, initial)
  }
}
