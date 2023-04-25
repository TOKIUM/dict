import { Dictionary } from '../../core/dictionary/Dictionary';
import { TextFormat } from '../TextFormat';

export class YamlFormat implements TextFormat {
  format(dictionary: Dictionary): string {
    const mainNamePart = `- name: ${dictionary.name.value}`;
    const descriptionsHeaderPart = dictionary.descriptions.length > 0 ? ['  descriptions:'] : [];
    const descriptionsBodyPart = dictionary.descriptions.map((description) => `    - ${description.value}`);
    const aliasesHeaderPart = dictionary.alias.length > 0 ? ['  aliases:'] : []; 
    const aliasesBodyPart = dictionary.alias.map((aliasName) => `    - ${aliasName.value}`);
    const featuresHeaderPart = dictionary.features.length > 0 ? [`  features:`] : [];
    const featuresBodyPart = dictionary.features.flatMap((f) => {
      const featureNamePart = `    - name: ${f.name.value}`;
      const featureDescHeaderPart = f.descriptions.length > 0 ? ['      descriptions:'] : [];
      const featureDescBodyPart = f.descriptions.map((d) => `        - ${d.value}`);
      return [featureNamePart, ...featureDescHeaderPart, ...featureDescBodyPart];
    });

    return [
      mainNamePart,
      ...descriptionsHeaderPart,
      ...descriptionsBodyPart,
      ...aliasesHeaderPart,
      ...aliasesBodyPart,
      ...featuresHeaderPart,
      ...featuresBodyPart,
    ].join('\n');
  }

  formatAll(dictionaries: Dictionary[]): string {
    return dictionaries.map((dictionary) => this.format(dictionary)).join('\n');
  }
}
