import validate, { T } from '../src/index';
import { ValidateError } from '../src/ValidateError';

describe('integer type validator', function () {
  test('integer directly', function () {
    expect(validate(35, T.integer())).resolves.toBe(35);
    expect(validate(-28, T.integer())).resolves.toBe(-28);
  });

  test('integer strings', function () {
    ['128', '0', '-15'].forEach(function (val) {
      expect(validate(val, T.integer())).resolves.toBe(parseInt(val));
    });
  });

  test('float string', function () {
    ['0.13', '3.0'].forEach(function (val) {
      expect(validate(val, T.integer())).rejects.toThrow(ValidateError);
    });
  });

  test('semver string', function () {
    expect(validate('3.2.28', T.integer())).rejects.toThrow(ValidateError);
  });

  test('NaN', function () {
    expect(validate(NaN, T.integer())).rejects.toThrow(ValidateError);
  });
});

describe('integer comparing cases', function () {
  test('greater than', function () {
    expect(validate(35, T.integer().gt(28))).resolves.toBe(35);
    expect(validate(35, T.integer().gt(35))).rejects.toThrow('greater than');
    expect(validate(35, T.integer().gt(48))).rejects.toThrow('greater than');
  });

  test('greater than or equal', function () {
    expect(validate(35, T.integer().ge(28))).resolves.toBe(35);
    expect(validate(35, T.integer().ge(35))).resolves.toBe(35);
    expect(validate(35, T.integer().ge(48))).rejects.toThrow('greater than');
  });

  test('less than', function () {
    expect(validate(35, T.integer().lt(28))).rejects.toThrow('less than');
    expect(validate(35, T.integer().lt(35))).rejects.toThrow('less than');
    expect(validate(35, T.integer().lt(48))).resolves.toBe(35);
  });

  test('less than or equal', function () {
    expect(validate(35, T.integer().le(28))).rejects.toThrow('less than');
    expect(validate(35, T.integer().le(35))).resolves.toBe(35);
    expect(validate(35, T.integer().le(48))).resolves.toBe(35);
  });

  test('between', function () {
    expect(validate(35, T.integer().between(18, 60))).resolves.toBe(35);
    expect(validate(35, T.integer().between(100, 200))).rejects.toThrowError('between');
  });
});
