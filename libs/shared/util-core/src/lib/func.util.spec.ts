import { executeIfFunction, getOrEmpty, getOrNil, switchCase } from './func.util';

describe('executeIfFunction', () => {
  test('should return execution when function', () => {
    const actual = executeIfFunction(() => true);

    expect(actual).toBeTruthy();
  });

  test('should return self otherwise', () => {
    const actual = executeIfFunction(true);

    expect(actual).toBeTruthy();
  });
});

describe('getOrNil', () => {
  test('should return undefined if undefined w/o fallback', () => {
    const actual = getOrNil(undefined)();

    expect(actual).toBeUndefined();
  });

  test('should return fallback if undefined', () => {
    const actual = getOrNil(undefined)('test');
    const expected = 'test';

    expect(actual).toEqual(expected);
  });

  test('should return the input otherwise', () => {
    const actual = getOrNil(1)();
    const expected = 1;

    expect(actual).toEqual(expected);
  });
});

describe('getOrEmpty', () => {
  test('should return empty array if undefined w/o fallback', () => {
    const actual = getOrEmpty(undefined)();
    const expected: Array<any> = [];

    expect(actual).toEqual(expected);
  });

  test('should return fallback if undefined', () => {
    const actual = getOrEmpty(undefined)(['test']);
    const expected = ['test'];

    expect(actual).toEqual(expected);
  });

  test('should return the input otherwise', () => {
    const actual = getOrEmpty([1])();
    const expected = [1];

    expect(actual).toEqual(expected);
  });
});

describe('switchCase', () => {
  test('should return the matching case', () => {
    const actual = switchCase({
      test: true
    })(false)('test');

    expect(actual).toBeTruthy();
  });

  test('should return fallback case w/o match', () => {
    const actual = switchCase({
      test: true
    })(false)('');

    expect(actual).toBeFalsy();
  });
});
