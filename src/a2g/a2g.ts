import * as _ from 'lodash';
import * as fs from 'fs';
import { Operation } from '../enums';
import { Generator } from './generator';

export class XGen {
    private static NAME_SEPARATOR = '-';
    private static KEYVAL_SEPARATOR = '=';
    private static OPERATIONS: Map<string, Operation> = new Map<string, Operation>(
        [
           ['class',     Operation.Class],
           ['component', Operation.Component],
           ['directive', Operation.Directive],
           ['enum',      Operation.Enum],
           ['interface', Operation.Interface],
           ['module',    Operation.Module],
           ['pipe',      Operation.Pipe],
           ['service',   Operation.Service]
        ]
    );
    private args: string[] = [];
    constructor(private allArgs: string[]) {
    }
    public execute(): Promise<any> {
        if (this.allArgs.length > 2){
            return this.run();
        } else {
           return Promise.resolve(this.showUsage());
        }
    }
    private showUsage(): string {
        return `Insufficient parameters!
        
          *----------------------------------------------------------------------------------*
            USAGE: a2g <STRUCTURE_TYPE> [dir=TARGET_PATH] <NAME> [OPTIONAL_ENTRIES]

            STRUCTURE_TYPE: class, component, directive, enum,
                            interface, module, pipe, service
            TARGET_PATH: optional target directory
            NAME: class/enum/interface name
            OPTIONAL_ENTRIES: when generating enums these entries will become enum-entries 
          *----------------------------------------------------------------------------------*

          Example:

          a2g component dir=./foxtrott foxtrott

          Result: ./foxtrott--
                         |--> foxtrott.component.ts
                         |--> foxtrott.component.html
                         |--> foxtrott.component.css
                         |--> index.ts (with export) 
        `;
    }
    private run(): Promise<boolean> {
        let opArg = _.toLower(this.allArgs[2]);
        let maybeTarget = this.allArgs[3];
        let targetPath = '.';
        let op = Operation.Unknown;
        let hasTargetPath = this.hasTargetPath(maybeTarget);
        if (hasTargetPath) {
            targetPath = this.getTargetPath(maybeTarget);
            console.log('TARGET: ' + targetPath);
        }
        this.args = _.remove(_.drop(this.allArgs, 2), (arg) => !_.isNil(arg));
        op = this.getOperation(opArg);
        if (op !== Operation.Unknown) {
            console.log(`Executing ${opArg} operation`);
            const fn = Generator.getFunction(op);
            let content = undefined;
            let originalName = hasTargetPath ? this.args[2] : this.args[1];
            let properName = this.toProperName(originalName);
            let elements = _.drop(this.args, hasTargetPath ? 3 : 2);
            switch (op) {
                case Operation.Class:
                    content = fn(properName);
                    break;
                case Operation.Component:
                    content = fn(properName, originalName, `./${originalName}.component.html`,
                                [`./${originalName}.component.css`]);
                    break;
                case Operation.Directive:
                    content = fn(properName, originalName);
                    break;
                case Operation.Enum:
                    content = fn(properName, elements);
                    break;
                case Operation.Interface:
                    content = fn(properName);
                    break;
                case Operation.Module:
                    content = fn(properName);
                    break;
                case Operation.Pipe:
                    content = fn(properName);
                    break;
                case Operation.Service:
                    content = fn(properName);
                    break;
                default:
                    return undefined;
            }
            if (_.isNil(content)) {
                return Promise.reject((err) => console.log(`ERROR: No content generated for operation ${op}!`));
            } else {
                return this.write(op, originalName, content, targetPath);
            }
        } else {
            return Promise.reject((err) => console.log(`Unknown operation!`));
        }
    }
    private write(operation: Operation, name: string, content: string, path: string): Promise<boolean> {
        this.writeDir(path);
        switch (operation) {
            case Operation.Class:
                return this.writeFile(content, name + '.ts', path);
            case Operation.Component:
                return this.writeComponent(content, name, path);
            case Operation.Directive:
                return this.writeFile(content, name + '.directive.ts', path);
            case Operation.Enum:
                return this.writeFile(content, name + '.ts', path);
            case Operation.Interface:
                return this.writeFile(content, name + '.ts', path);
            case Operation.Module:
                return this.writeFile(content, name + '.module.ts', path);
            case Operation.Pipe:
                return this.writeFile(content, name + '.pipe.ts', path);
            case Operation.Service:
                return this.writeFile(content, name + '.service.ts', path);
            default:
                return undefined;
            }
    }

    private writeDir(name: string): boolean {
        let ok = true;
        if (!fs.existsSync(name)) {
            try {
                fs.mkdirSync(name);
            } catch (error) {
                console.log(error);
                ok = false;
            }
        }
        return ok;
    }

    private writeComponent(content: string, name: string, path: string = '.'): Promise<boolean> {
        console.log(`Writing component file ${name} to ${path}`);
        return this.writeFile(content, name + '.component.ts', path).then(res => {
            if (res) {
                console.log(`Writing component template ${name}`);
                return this.writeFile(`<div>${_.toUpper(name)}</div>`, name + '.component.html', path)
                    .then(res2 => {
                        if (res2) {
                            console.log(`Writing component style ${name}`);
                            return this.writeFile('', name + '.component.css', path).then(res3 => {
                                if (res3) {
                                    return this.writeFile(`export * from './${name}.component';\n`, 'index.ts', path);
                                }
                                return false;
                            });
                        }
                        return false;
                });
            }
            return false;
        });
    }

    private writeFile(content: string, name: string, path: string = '.'): Promise<boolean> {
        return new Promise((resolve, reject) => {
          fs.writeFile(`${path}/${name}`, content, (err) => {
              if (!_.isNil(err)) {
                  reject(false);
              } else {
                  resolve(true);
              }
          });
        });
    }
    private toProperName(arg: string): string {
      let proper = '';
      const allStrings = this.splitString(arg);
      _.each(allStrings, (word) => {
          console.log(word);
          const upper = this.toUpperFirst(word);
          proper += upper;
      });
      return proper;
    }
    private toUpperFirst(term: string): string {
        return _.capitalize(term);
    }
    private splitString(term: string): string[] {
        return _.split(term, XGen.NAME_SEPARATOR);
    }
    private getTargetPath(term: string): string {
        let arg = '';
        let path = '';
        let separatorPos = term.indexOf(XGen.KEYVAL_SEPARATOR);
        arg = term.substr(0, separatorPos);
        path = term.substr(separatorPos + 1);
        return path;
    }
    private hasTargetPath(term: string): boolean {
        return term.includes('dir=');
    }
    private getOperation(term: string): Operation {
        let op: Operation = Operation[_.upperFirst(term)];
        if (_.isNil(op)) {
            op = Operation.Unknown;
        }
        return op;
    }
}
