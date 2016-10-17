import * as _ from 'lodash';

const classBody: string = `
/**
 * Class description here
 */
export class $[CLASS_NAME] {

    /**
     * Default constructor
     * @constructor
     */
    constructor() { }
}

`.trim();

export default function a2gClass(name: string): string {
    const properClass = _.replace(classBody, '$[CLASS_NAME]', name);
    return properClass;
};
