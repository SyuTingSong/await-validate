import validate, { R, T } from '../src/index';

describe('float type validator', function () {
  test('float directly', function () {
    expect(validate(1.5, T.float())).resolves.toBe(1.5);
    expect(validate(-28, T.float())).resolves.toBe(-28);
  });

  test('float strings', function () {
    ['128.178', '0.025', '-15'].forEach(function (val) {
      expect(validate(val, R.required().float())).resolves.toBe(parseFloat(val));
    });
  });

  test('semver string', function () {
    expect(validate('3.2.28', T.float())).rejects.toThrow('be a float');
  });

  test('NaN', function () {
    expect(validate(NaN, T.float())).rejects.toThrow('be a float');
  });
});

describe('float comparing cases', function () {
  test('greater than', function () {
    expect(validate(35.5, T.float().gt(2.8))).resolves.toBe(35.5);
    expect(validate(35.5, T.float().gt(48.7))).rejects.toThrow('greater than');
  });

  test('less than', function () {
    expect(validate(35.5, T.float().lt(2.8))).rejects.toThrow('less than');
    expect(validate(35.5, T.float().lt(48.8))).resolves.toBe(35.5);
  });

  test('between', function () {
    expect(validate(35.5, T.float().between(35.5, 35.8))).resolves.toBe(35.5);
    expect(validate(35.5, T.float().between(65.7, 200))).rejects.toThrowError('between');
  });
});
