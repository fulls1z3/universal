import { FalsyPipe } from './falsy.pipe';

describe('FalsyPipe', () => {
  test('is defined', () => {
    const pipe = new FalsyPipe();

    expect(FalsyPipe).toBeDefined();
    expect(pipe).toBeDefined();
    expect(pipe instanceof FalsyPipe).toBeTruthy();
  });

  test('should return true if the value is `false`', () => {
    const pipe = new FalsyPipe();

    const actual = pipe.transform(false);
    expect(actual).toBeTruthy();
  });

  test('should return true if the value is `null`', () => {
    const pipe = new FalsyPipe();

    const actual = pipe.transform(false);
    expect(actual).toBeTruthy();
  });

  test('should return true if the value is `undefined`', () => {
    const pipe = new FalsyPipe();

    const actual = pipe.transform(false);
    expect(actual).toBeTruthy();
  });

  test('should return false otherwise', () => {
    const pipe = new FalsyPipe();

    const actual = pipe.transform(true);
    expect(actual).toBeFalsy();
  });
});
