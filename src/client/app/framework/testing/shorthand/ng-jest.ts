// angular
import { async, fakeAsync, inject, tick } from '@angular/core/testing';

// module
import { TestApi } from './ng-base';

export interface JestApi extends TestApi {
  async(fn: Function): Function;
  fakeAsync(fn: Function): Function;
  inject(tokens: Array<any>, fn: Function): Function;
  tick(delay?: number): void;
}

export const ngJest: JestApi = {
  ae: afterEach, // shorthand afterEach
  afterEach,
  describe,
  fdescribe,
  xdescribe,
  async,
  fakeAsync,
  be: beforeEach, // shorthand beforeEach
  beforeEach,
  e: expect, // shorthand expect
  expect,
  fail,
  inject,
  it,
  fit,
  xit,
  pending,
  spyOn,
  tick
};
