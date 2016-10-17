import * as _ from 'lodash';
import * as fs from 'fs';
import { Structure, Command,
         Option } from '../enums';
import { Generator } from './generator';

interface Arg {
    name: string;
    params: any;
    type: number;
}

export class XGen {
    private static NAME_SEPARATOR = '-';
    private static KEYVAL_SEPARATOR = '=';
    private static OPERATIONS: Map<string, Structure> = new Map<string, Structure>(
        [
           ['class',     Structure.Class],
           ['component', Structure.Component],
           ['directive', Structure.Directive],
           ['enum',      Structure.Enum],
           ['interface', Structure.Interface],
           ['module',    Structure.Module],
           ['pipe',      Structure.Pipe],
           ['service',   Structure.Service]
        ]
    );
    private line: string[] = [];
    private chain: Arg[] = [];
    constructor(private allArgs: string[]) {
       this.line = this.getArgs(this.allArgs);
       this.chain = this.getArgumentChain(this.line);
    }
    public execute(): Promise<any> {
        if (this.allArgs.length > 2 &&
            !_.find(this.allArgs, a => a === '--help')) {
            return this.runEx();
        } else {
           return this.showUsage().then(h => {
               console.log(h);
               return Promise.resolve(true);
           });
        }
    }
    private showUsage(): Promise<string> {
        return Promise.resolve(`*-------------------------------------------------------------------------------------------*
            USAGE: a2g <STRUCTURE_TYPE> <NAME> [--dir PATH] [--opt VALUES] [--help]

            STRUCTURE_TYPE: class, component, directive, enum,
                            interface, module, pipe, service
            NAME            [mandatory] name of the structure to be created
            --dir PATH      [optional] target directory (if not set the current path will be used)
            --opt VALUES    [optional] entries separated by comma or white space
            --overwrite     [optional] overwrite existing files 
            --dry           [optional] execute without touching the file system
            --help          this text
          *-------------------------------------------------------------------------------------------*

          Example:

          a2g component foxtrott --dir ./foxtrott

         
          Will produce: ./foxtrott--|
                                    |--> foxtrott.component.ts
                                    |--> foxtrott.component.html
                                    |--> foxtrott.component.css
                                    |--> index.ts (with export) 

          Short versions of structure names are also available:

          c  => component
          cl => class 
          e  => enum
          i  => interface
          d  => directive 
          m  => module 
          p  => pipe 
          s  => service 
        `);
    }
    private getArgs(cmdArgs: string[]): string[] {
        let args = _.drop(cmdArgs, 2)
                    .map(a => a.toLowerCase())
                    .join(' ');
        return _.map(_.filter(_.split(args, '--'), x => x !== ''),
                                                  arg => arg.trim());
    }
    private getArgumentChain(args: string[]): Arg[] {
        let optionContextType: Option = Option.Unknown;
        const map = _.map(args, a => {
            let kv: Arg = {
                    name: undefined,
                    params: undefined,
                    type: 0
            };
            if (this.isWithParams(a)) {
                let { name, params } = this.separate(a);
                kv.name = _.clone(name);
                kv.params = _.clone(params);
            } else {
                kv.name = _.clone(a);
                kv.params = '';
            }
            if (this.isCommand(kv.name)) {
                kv.type = this.getCommand(kv.name);
            } else if (this.isStructure(this.toLongStructureName(kv.name))) {
                kv.type = this.getStructure(kv.name);
                kv.params = _.split(kv.params, ',', 1)[0];
                let mapping = _.upperFirst(this.toLongStructureName(kv.name)) + 'Option';
                optionContextType = Option[mapping];
            } else if (this.isOption(kv.name)) {
                kv.type = optionContextType;
            }
            return kv;
        });
        return map;
    }
    private getCommand(cmd: string): Command {
        switch (cmd) {
            case 'dir':
                return Command.Dir;
            case 'overwrite':
                return Command.Overwrite;
            case 'dry':
                return Command.Dry;
            default:
                return Command.Unknown;
        }
    }
    private getStructure(str: string): Structure {
        const name = this.toLongStructureName(str);
        return Structure[_.upperFirst(name)];
    }
    private isWithParams(cmd: string): boolean {
        return !_.isNil(cmd) && cmd.includes(' ');
    }
    private separate(cmd: string): any {
        const split = _.split(cmd, ' ');
        return {
            name: split[0],
            params: _.join(_.drop(split, 1))
        };
    }
    private isCommand(x: string): boolean {
        const maybeCmd: Command = Command[_.upperFirst(x)];
        return maybeCmd !== undefined;
    }
    private isStructure(x: string): boolean {
        const maybeStructure: Structure = Structure[_.upperFirst(x)];
        return maybeStructure !== undefined;
    }
    private isOption(x: string): boolean {
        return x === 'opt';
    }
    private toShortStructureName(op: string): string {
        switch (op) {
            case 'component':
                return 'c';
            case 'class':
                return 'cl';
            case 'module':
                return 'm';
            case 'directive':
                return 'd';
            case 'enum':
                return 'e';
            case 'interface':
                return 'i';
            case 'pipe':
                return 'p';
            case 'service':
                return 's';
            default:
              return op;
        }
    }
    private toLongStructureName(op: string): string {
        switch (op) {
            case 'c':
                return 'component';
            case 'cl':
                return 'class';
            case 'm':
                return 'module';
            case 'd':
                return 'directive';
            case 'e':
                return 'enum';
            case 'i':
                return 'interface';
            case 'p':
                return 'pipe';
            case 's':
                return 'service';
            default:
                return op;
        }
    }
    private runEx(): Promise<boolean> {
        const originalArgs = this.allArgs;
        this.allArgs = ['node', 'index.js',
                        '', 'dir=.',
                        '', 'unknown',
                        'overwrite=false',
                        'dry=false'];
        _.each(this.chain, (cmd, idx, lst) => {
            if (cmd.type <= Structure.Pipe) {
                this.allArgs[2] = this.toLongStructureName(cmd.name);
                this.allArgs[4] = cmd.params;
            } else if (cmd.type > Command.Unknown &&
                       cmd.type <= Command.Dir) {
                let cmdType = (<Command>cmd.type);
                if (cmdType === Command.Dir) {
                    this.allArgs[3] = 'dir=' + cmd.params;
                } else if (cmdType === Command.Overwrite) {
                    this.allArgs[6] = 'overwrite=true';
                } else if (cmdType === Command.Dry) {
                    this.allArgs[7] = 'dry=true';
                }
            } else if (cmd.type > Option.Unknown) {
                this.allArgs[5] = cmd.params;
            }
        });
        return this.run();
    }
    private run(): Promise<boolean> {
        let opArg = _.toLower(this.allArgs[2]);
        let targetPath = this.getOption(this.allArgs, 'dir');
        let op = Structure.Unknown;
        let overwrite = this.getOption(this.allArgs, 'overwrite') === 'true';
        let dryRun = this.getOption(this.allArgs, 'dry') === 'true';
        let args = _.remove(_.drop(this.allArgs, 2), (arg) => !_.isNil(arg));
        let content = undefined;
        let originalName = args[2];
        let properName = this.toProperName(originalName);
        let elements = _.drop(args, 3)[0].split(',');
        op = this.getOperation(opArg);
        if (op !== Structure.Unknown) {
            const fn = Generator.getFunction(op);
            switch (op) {
                case Structure.Class:
                    content = fn(properName);
                    break;
                case Structure.Component:
                    content = fn(properName, originalName, `./${originalName}.component.html`,
                                [`./${originalName}.component.css`]);
                    break;
                case Structure.Directive:
                    content = fn(properName, originalName);
                    break;
                case Structure.Enum:
                    content = fn(properName, elements);
                    break;
                case Structure.Interface:
                    content = fn(properName);
                    break;
                case Structure.Module:
                    content = fn(properName);
                    break;
                case Structure.Pipe:
                    content = fn(properName);
                    break;
                case Structure.Service:
                    content = fn(properName);
                    break;
                default:
                    return undefined;
            }
            if (_.isNil(content)) {
                return Promise.reject((err) => console.log(`ERROR: No content generated for operation ${op}!`));
            } else {
                return this.writeDir(targetPath, overwrite, dryRun).then(ok => {
                    return this.write(op, originalName, content, targetPath, overwrite, dryRun);
                });
            }
        } else {
            return Promise.reject((err) => console.log(`Unknown operation!`));
        }
    }
    private write(operation: Structure, name: string, content: string,
                                        path: string, overwrite: boolean = false,
                                        dry: boolean = false): Promise<boolean> {
        switch (operation) {
            case Structure.Class:
                return this.writeFile(content, name + '.ts', path, overwrite, dry);
            case Structure.Component:
                return this.writeComponent(content, name, path, overwrite, dry);
            case Structure.Directive:
                return this.writeFile(content, name + '.directive.ts', path, overwrite, dry);
            case Structure.Enum:
                return this.writeFile(content, name + '.ts', path, overwrite, dry);
            case Structure.Interface:
                return this.writeFile(content, name + '.ts', path, overwrite, dry);
            case Structure.Module:
                return this.writeFile(content, name + '.module.ts', path, overwrite, dry);
            case Structure.Pipe:
                return this.writeFile(content, name + '.pipe.ts', path, overwrite, dry);
            case Structure.Service:
                return this.writeFile(content, name + '.service.ts', path, overwrite, dry);
            default:
                return undefined;
            }
    }

    private writeDir(name: string, overwrite: boolean = false, dry: boolean = false): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return fs.access(name, fs.constants.R_OK | fs.constants.W_OK, err => {
                if ((_.isNull(err) && overwrite && !dry) || !_.isNull(err)) {
                    return fs.mkdir(name, err2 => resolve(true));
                } else {
                    if (dry) {
                        console.log(`Dry Run | Creating directory ${name}`);
                        resolve(true);
                    } else {
                        console.error(`ERROR: Directory ${name} already exists!`);
                        resolve(false);
                    }
                }
            });
        });
    }

    private writeComponent(content: string, name: string, path: string = '.',
                                                    overwrite: boolean = false,
                                                    dry: boolean = false): Promise<boolean> {
        return this.writeFile(content, name + '.component.ts', path, overwrite, dry).then(res => {
            if (res) {
                return this.writeFile(`<div>${_.toUpper(name)}</div>`, name + '.component.html',
                                                                               path, overwrite, dry)
                    .then(res2 => {
                        if (res2) {
                            return this.writeFile('', name + '.component.css', path,
                                                                            overwrite, dry).then(res3 => {
                                if (res3) {
                                    return this.writeFile(`export * from './${name}.component';\n`, 'index.ts',
                                                                                        path, overwrite, dry);
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

    private writeFile(content: string, name: string, path: string = '.',
                                            overwrite: boolean = false,
                                            dry: boolean = false): Promise<boolean> {
        return new Promise((resolve, reject) => {
           const fullPath = `${path}/${name}`;
           return fs.access(name, fs.constants.R_OK | fs.constants.W_OK, err => {
               if ((_.isNull(err) && overwrite && !dry) || !_.isNull(err)) {
                   fs.writeFile(fullPath, content, err2 => {
                       if (!_.isNil(err2)) {
                           reject(false);
                       } else {
                           resolve(true);
                       }
                   });
               } else {
                   if (dry) {
                       console.log(`Dry Run | Writing file ${fullPath}`);
                   } else {
                       console.error(`ERROR: File ${fullPath} already exists!`);
                       resolve(false);
                   }
               }
           });
        });
    }
    private toProperName(arg: string): string {
      let proper = '';
      const allStrings = this.splitString(arg);
      _.each(allStrings, (word) => {
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
    private getTargetPath(args: string[]): string {
        let found = _.find(args, a => a.includes('dir='));
        return found;
    }
    private getOperation(term: string): Structure {
        let op: Structure = Structure[_.upperFirst(term)];
        if (_.isNil(op)) {
            op = Structure.Unknown;
        }
        return op;
    }
    private getOption(args: string[], optName: string) {
        let found = _.find(args, a => a.includes(`${optName}=`));
        let value = '';
        if (found) {
            const split = _.split(found, '=');
            value = split[1];
        }
        return value;
    }
}
