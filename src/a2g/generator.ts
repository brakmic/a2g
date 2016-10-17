import * as _ from 'lodash';
import { Structure } from '../enums';
import { FUNCTIONS } from '../templates';


export class Generator {
    public static getFunction(operation: Structure): Function {
        switch (operation) {
            case Structure.Class:
                return FUNCTIONS.a2gClass;
            case Structure.Component:
                return FUNCTIONS.a2gComponent;
            case Structure.Directive:
                return FUNCTIONS.a2gDirective;
            case Structure.Enum:
                return FUNCTIONS.a2gEnum;
            case Structure.Interface:
                return FUNCTIONS.a2gInterface;
            case Structure.Module:
                return FUNCTIONS.a2gModule;
            case Structure.Pipe:
                return FUNCTIONS.a2gPipe;
            case Structure.Service:
                return FUNCTIONS.a2gService;
            case Structure.Unknown:
                return undefined;
            default:
                return undefined;
        }
    }
}
