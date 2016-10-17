import * as _ from 'lodash';

const enumBody = `
/**
 * Enumeration
 */
export enum $[ENUM_NAME] {
    $[ENUM_ELEMENTS]
}
`.trim();

export default function a2gEnum(name: string, elements: string[]): string {
    let elemsString = '';
    let properEnum = _.replace(enumBody, '$[ENUM_NAME]', name);
    _.each(elements, (el) => {
        elemsString += _.upperFirst(el) + ',\n';
    });
    _.trimEnd(elemsString, ',\n');
    properEnum = _.replace(properEnum, '$[ENUM_ELEMENTS]', elemsString);
    return properEnum;
}
