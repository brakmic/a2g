import * as _ from 'lodash';
import { Operation } from '../enums';
import { FUNCTIONS } from '../templates';


export class Generator {
    public static getFunction(operation: Operation): Function {
        switch (operation) {
            case Operation.Class:
                return FUNCTIONS.a2gClass;
            case Operation.Component:
                return FUNCTIONS.a2gComponent;
            case Operation.Directive:
                return FUNCTIONS.a2gDirective;
            case Operation.Enum:
                return FUNCTIONS.a2gEnum;
            case Operation.Interface:
                return FUNCTIONS.a2gInterface;
            case Operation.Module:
                return FUNCTIONS.a2gModule;
            case Operation.Pipe:
                return FUNCTIONS.a2gPipe;
            case Operation.Service:
                return FUNCTIONS.a2gService;
            case Operation.Unknown:
                return undefined;
            default:
                return undefined;
        }
    }
}
