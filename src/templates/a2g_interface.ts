import * as _ from 'lodash';

const interfaceBody = `
export interface $[INTERFACE_NAME] {

}
`;

export default function a2gInterface(name: string): string {
    return _.replace(interfaceBody, '$[INTERFACE_NAME]', name);
}
