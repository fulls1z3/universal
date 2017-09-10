// angular
import { async, fakeAsync, inject, tick } from '@angular/core/testing';

export interface TestApi {
  ae: Function;
  afterEach: Function;
  describe: Function;
  fdescribe: Function;
  xdescribe: Function;
  async(fn: Function): Function;
  fakeAsync(fn: Function): Function;
  be(fn: Function): void;
  beforeEach(fn: Function): void;
  e(actual: any): jest.Matchers<void>;
  expect(actual: any): jest.Matchers<void>;
  fail(e?: any): void;
  inject(tokens: Array<any>, fn: Function): Function;
  it(name: string, fn: Function, timeOut?: number): void;
  fit(name: string, fn: Function, timeOut?: number): void;
  xit(name: string, fn: Function, timeOut?: number): void;
  pending(reason?: string): void;
  spyOn(object: any, method: string): jasmine.Spy;
  tick(delay?: number): void;
}

export const ngJest: TestApi = {
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
