/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { Generator } from '../src/a2g';

describe('Class : Generator', () => {
  it('should be initialized', () => {
    const gen = new Generator();
    expect(gen).toBeTruthy();
  });
});
