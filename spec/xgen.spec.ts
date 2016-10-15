/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { XGen } from '../src/a2g';

describe('Class : XGen', () => {
  let testOutDir = './spec/test_out';
  let resultComponent = false;
  let resultClass = false;
  let resultDirective = false;
  let resultEnum = false;
  let resultInterface = false;
  let resultModule = false;
  let resultPipe = false;
  let resultService = false;

  let a2gComponent: XGen = undefined;
  let a2gClass: XGen = undefined;
  let a2gDirective: XGen = undefined;
  let a2gEnum: XGen = undefined;
  let a2gInterface: XGen = undefined;
  let a2gModule: XGen = undefined;
  let a2gPipe: XGen = undefined;
  let a2gService: XGen = undefined;

  const paramsComponent = ['node', 'index.ts', 'component', `dir=${testOutDir}`, 'foxtrott'];
  const paramsClass = ['node', 'index.ts', 'class', `dir=${testOutDir}`, 'unicorn'];
  const paramsDirective = ['node', 'index.ts', 'directive', `dir=${testOutDir}`, 'charlie'];
  const paramsEnum = ['node', 'index.ts', 'enum', `dir=${testOutDir}`, 'bloodhound-gang', 'foxtrott', 'unicorn', 'charlie', 'kilo'];
  const paramsInterface = ['node', 'index.ts', 'interface', `dir=${testOutDir}`, 'foxtrott'];
  const paramsModule = ['node', 'index.ts', 'module', `dir=${testOutDir}`, 'foxtrott'];
  const paramsPipe = ['node', 'index.ts', 'pipe', `dir=${testOutDir}`, 'foxtrott'];
  const paramsService = ['node', 'index.ts', 'service', `dir=${testOutDir}`, 'foxtrott'];

  beforeAll(done => {
    a2gComponent = new XGen(paramsComponent);
    a2gComponent.execute().then(res => {
      resultComponent = res;
      done();
    });
  });

  beforeAll(done => {
    a2gClass     = new XGen(paramsClass);
    a2gClass.execute().then(res => {
      resultClass = res;
      done();
    });
  });

  beforeAll(done => {
    a2gDirective = new XGen(paramsDirective);
    a2gDirective.execute().then(res => {
      resultDirective = res;
      done();
    });
  });

  beforeAll(done => {
     a2gEnum = new XGen(paramsEnum);
     a2gEnum.execute().then(res => {
       resultEnum = res;
       done();
     });
  });

  beforeAll(done => {
    a2gInterface = new XGen(paramsInterface);
    a2gInterface.execute().then(res => {
      resultInterface = res;
      done();
    });
  });

  beforeAll(done => {
    a2gModule = new XGen(paramsModule);
    a2gModule.execute().then(res => {
      resultModule = res;
      done();
    });
  });

  beforeAll(done => {
    a2gPipe = new XGen(paramsModule);
    a2gPipe.execute().then(res => {
      resultPipe = res;
      done();
    });
  });

  beforeAll(done => {
    a2gService = new XGen(paramsService);
    a2gService.execute().then(res => {
      resultService = res;
      done();
    });
  });

  /**
   * Instances
   */
  it('a2gComponent: should be initialized', () => {
    expect(a2gComponent).toBeTruthy();
  });

  it('a2gClass: should be initialized', () => {
    expect(a2gClass).toBeTruthy();
  });

  it('a2gDirective: should be initialized', () => {
    expect(a2gDirective).toBeTruthy();
  });

  it('a2gEnum: should be initialized', () => {
    expect(a2gEnum).toBeTruthy();
  });

  it('a2gInterface: should be initialized', () => {
    expect(a2gInterface).toBeTruthy();
  });

  it('a2gModule: should be initialized', () => {
    expect(a2gModule).toBeTruthy();
  });

  it('a2gPipe: should be initialized', () => {
    expect(a2gPipe).toBeTruthy();
  });

  it('a2gService: should be initialized', () => {
    expect(a2gService).toBeTruthy();
  });
  /**
   * Outputs
   */
  it('a2gComponent: should generate a component', () => {
    expect(resultComponent).toBeTruthy();
  });

  it('a2gClass: should generate a class', () => {
    expect(resultClass).toBeTruthy();
  });

  it('a2gDirective: should generate a directive', () => {
    expect(resultDirective).toBeTruthy();
  });

  it('a2gEnum: should generate an enum', () => {
    expect(resultEnum).toBeTruthy();
  });

  it('a2gInterface: should generate an interface', () => {
    expect(resultInterface).toBeTruthy();
  });

  it('a2gModule: should generate a module', () => {
    expect(resultModule).toBeTruthy();
  });

  it('a2gPipe: should generate a pipe', () => {
    expect(resultPipe).toBeTruthy();
  });

  it('a2gService: should generate a service', () => {
    expect(resultService).toBeTruthy();
  });
});
