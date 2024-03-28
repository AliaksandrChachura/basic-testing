// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values1 = [
    { id: 1, baz: 'bar' },
    { id: 2, baz: 'baz' },
    { id: 3, baz: 'foo' },
  ];

  const values2 = [
    { id: 11, baz: 'boo' },
    { id: 22, baz: 'damn' },
    { id: 33, baz: 'ffuuu-----' },
  ];

  const expected = {
    value: { id: 1, baz: 'bar' },
    next: {
      value: { id: 2, baz: 'baz' },
      next: {
        value: { id: 3, baz: 'foo' },
        next: {
          value: null,
          next: null,
        },
      },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values1)).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values2)).toMatchSnapshot();
  });
});
