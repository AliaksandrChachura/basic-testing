// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(jest.getTimerCount()).toBe(1);
    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(jest.getTimerCount()).toBe(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
