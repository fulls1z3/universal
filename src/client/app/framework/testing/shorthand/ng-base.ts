export interface TestApi {
  ae: Function;
  afterEach: Function;
  describe: Function;
  fdescribe: Function;
  xdescribe: Function;
  be(fn: Function): void;
  beforeEach(fn: Function): void;
  e(actual: any): jest.Matchers<void>;
  expect(actual: any): jest.Matchers<void>;
  fail(e?: any): void;
  it(name: string, fn: Function, timeOut?: number): void;
  fit(name: string, fn: Function, timeOut?: number): void;
  xit(name: string, fn: Function, timeOut?: number): void;
  pending(reason?: string): void;
  spyOn(object: any, method: string): jasmine.Spy;
}
