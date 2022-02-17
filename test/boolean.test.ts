import validate, { R, T } from '../src/index';
import { ValidateError } from '../src/ValidateError';

describe('boolean type validator', function () {
  test('test boolean values', function () {
    expect.assertions(2);
    expect(validate(false, R.required().boolean())).resolves.toBeFalsy();
    expect(validate(true, R.required().boolean())).resolves.toBeTruthy();
  });

  test('truthy strings', function () {
    ['yes', '1', 'on', 'true', 'YES', 'TRUE', 'On'].forEach(function (val) {
      expect(validate(val, R.required().boolean())).resolves.toBeTruthy();
    });
  });

  test('falsy strings', function () {
    ['no', '0', 'off', 'false', 'NO', 'Off', 'FALse'].forEach(function (val) {
      expect(validate(val, R.required().boolean())).resolves.toBeFalsy();
    });
  });

  test('strange strings', function () {
    ['a', 'b', 'Good', 'T'].forEach(function (val) {
      expect(validate(val, T.boolean())).rejects.toThrow(ValidateError);
    });
  });

  test('null value is false', function () {
    [undefined, null, '', NaN].forEach(function (val) {
      expect(validate(val, T.boolean())).resolves.toBeFalsy();
    });
  });

  test('complex is not boolean', function () {
    [{}, [], function () {}].forEach(function (val) {
      expect(validate(val, T.boolean())).rejects.toThrow(ValidateError);
    });
  });
});
