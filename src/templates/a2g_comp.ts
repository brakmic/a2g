import * as _ from 'lodash';

const componentBody: string = `
import { Component, OnInit } from '@angular/core';
/**
 * Component description here
 */
@Component({
    moduleId: module.id,
    selector: '$[SELECTOR_NAME]',
    templateUrl: '$[TEMPLATE_URL]',
    styleUrls: [$[STYLE_URLS]]
})
export class $[COMPONENT_NAME]Component implements OnInit {
    /**
     * Default constructor
     * @constructor
     */
    constructor() { }

    public ngOnInit() {

    }
}
`;

export default function a2gComponent(name: string, selectorName: string = 'selector-needed',
                                     templateUrl: string = 'template.html',
                                     styleUrls: string[] = ['style.css']) {
     let properComponent = _.replace(componentBody, '$[SELECTOR_NAME]', selectorName);
     properComponent = _.replace(properComponent, '$[TEMPLATE_URL]', templateUrl);
     properComponent = _.replace(properComponent, '$[COMPONENT_NAME]', name);
     let urls = '';
     _.each(styleUrls, (url) => {
         urls += '`' + url + '`,\n';
     });
     urls = _.trimEnd(urls, ',\n');
     properComponent = _.replace(properComponent, '$[STYLE_URLS]', urls);
     return properComponent;
}
