import * as _ from 'lodash';

const moduleBody = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/**
 * Module description here
 */
@NgModule({
    imports: [ BrowserModule ],
    declarations: [  ]
})
export class $[MODULE_NAME]Module {
    /**
     * Default constructor
     * @constructor
     * */ 
    constructor() { }
}

`.trim();

export default function a2gModule(name: string): string {
    return _.replace(moduleBody, '$[MODULE_NAME]', name);
}
