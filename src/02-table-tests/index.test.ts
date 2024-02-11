// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  test.each([
    { a: 5, b: 3, action: Action.Add, expected: 8 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 5, b: 3, action: Action.Multiply, expected: 15 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 1, b: 0, action: Action.Divide, expected: Infinity },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { a: 2, b: 3, action: 'invalidAction' as any, expected: null },
    { a: '5', b: '3', action: Action.Add, expected: null },
  ])(
    'should calculate $action with $a and $b to get $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
