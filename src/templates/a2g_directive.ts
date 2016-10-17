import * as _ from 'lodash';

const directiveBody = `
import { Directive, OnInit } from '@angular/core';
/**
 * Directive description here
 */
@Directive({
    selector: '$[SELECTOR_NAME]',
})
export class $[DIRECTIVE_NAME]Directive implements OnInit {
    /**
     * Default constructor
     * @constructor
     */
    constructor() { }
    /**
     * @return {void} Life-cycle method that gets executed after object initialization
     */
    public ngOnInit() { 

    }

}
`.trim();

export default function a2gDirective(name: string, selector: string): string {
    let directive = _.replace(directiveBody, '$[DIRECTIVE_NAME]', name);
    directive = _.replace(directive, '$[SELECTOR_NAME]', selector);
    return directive;
};
