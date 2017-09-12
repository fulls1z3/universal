// module
import { TestApi } from './ng-base';

export const ngE2e: TestApi = {
  ae: afterEach, // shorthand afterEach
  afterEach,
  describe,
  fdescribe,
  xdescribe,
  be: beforeEach, // shorthand beforeEach
  beforeEach,
  e: expect, // shorthand expect
  expect,
  fail,
  it,
  fit,
  xit,
  pending,
  spyOn
};
