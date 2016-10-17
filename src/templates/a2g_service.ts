import * as _ from 'lodash';

const serviceBody = `
import { Injectable } from '@angular/core';
/**
 * Service description here
 */
@Injectable()
export class $[SERVICE_NAME]Service {
    /** 
    * Default constructor
    * @constructor
    */
    constructor() { }

}
`.trim();

export default function a2gService(name: string): string {
    return _.replace(serviceBody, '$[SERVICE_NAME]', name);
}
