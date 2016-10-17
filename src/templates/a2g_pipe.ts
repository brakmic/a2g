const pipeBody = `
import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe description here
 */
@Pipe({
    name: '$[PIPE_NAME]'
})
export class $[PIPE_NAME]Pipe implements PipeTransform {
    /**
     * Transforms a value
     * @param {any} Input value
     * @param {any}  Input args
     */
    public transform(value: any, args: any) {
        
    }

}
`.trim();

export default function a2gPipe(name: string): string {
    // multiple string replacements here
    return pipeBody.split('$[PIPE_NAME]').join(name);
}
