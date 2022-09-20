import validate, { T } from '../src/index';

describe('array type validator', function () {
  test('object as array', function () {
    expect(validate({ a: 1, b: 2 }, T.array())).rejects.toThrow('must be an array');
    expect(validate('Hello', T.array())).rejects.toThrow('must be an array');
    expect(validate(['a', 'b', 'c'], T.array())).resolves.toEqual(['a', 'b', 'c']);
  });

  test('array min length', function () {
    expect(validate([], T.array().minLength(1))).rejects.toThrow('at least');
    expect(validate(['a'], T.array().minLength(1))).resolves.toEqual(['a']);
    expect(validate(['a', 'b'], T.array().minLength(1))).resolves.toEqual(['a', 'b']);
  });

  test('array max length', function () {
    expect(validate([], T.array().maxLength(3))).resolves.toEqual([]);
    expect(validate([1, 2], T.array().maxLength(3))).resolves.toEqual([1, 2]);
    expect(validate([1, 2, 3], T.array().maxLength(3))).resolves.toEqual([1, 2, 3]);
    expect(validate([1, 2, 3, 4], T.array().maxLength(3))).rejects.toThrow('at most');
  });

  test('array sub rules', function () {
    expect(validate(['a', 'b', 'c'], T.array().subRules(T.string().alpha()))).resolves.toEqual(['a', 'b', 'c']);
    expect(validate(['a', 'b', 118], T.array().subRules(T.string().alpha()))).rejects.toThrow('alphabetic');
    expect(validate(['a', 'b', 118], T.array().subRules(T.string().alphanumeric()))).resolves.toEqual([
      'a',
      'b',
      '118',
    ]);
  });
});
