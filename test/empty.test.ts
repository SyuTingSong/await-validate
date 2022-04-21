import validate, { R } from '../src/index';
import { ValidateError } from '../src/ValidateError';

describe('test null values that convert to undefined', function () {
  test('null', async function () {
    const r = await validate(null, R.nullable());
    expect(r).toBeUndefined();
  });

  test('empty string', async function () {
    const r = await validate('', R.nullable());
    expect(r).toBeUndefined();
  });

  test('undefined', async function () {
    expect(await validate(undefined, R.nullable())).toBeUndefined();
  });

  test('NaN', async function () {
    expect(await validate(NaN, R.nullable())).toBeUndefined();
  });

  test('object contains null value', async function () {
    const params = await validate(
      {
        n: null,
        s: '',
        u: undefined,
        a: NaN,
      },
      {
        n: R.nullable(),
        s: R.nullable(),
        u: R.nullable(),
        a: R.nullable(),
        x: R.nullable(),
      }
    );
    expect(params).toEqual({});
    const keys = Object.keys(params);
    expect(keys).toHaveLength(5);
    expect(keys).toContain('n');
    expect(keys).toContain('s');
    expect(keys).toContain('u');
    expect(keys).toContain('a');
    expect(keys).toContain('x');
  });
});

describe('test empty values that keep as is', function () {
  test('empty object', async function () {
    const r = await validate({}, R.nullable());
    expect(r).toEqual({});
  });

  test('empty array', async function () {
    expect(await validate([], R.nullable())).toEqual([]);
  });

  test('zero', async function () {
    expect(await validate(0, R.nullable())).toBe(0);
  });

  test('false', async function () {
    expect(await validate(false, R.nullable())).toBeFalsy();
  });
});

describe('combine nullable and type validator', function () {
  test('string', async function () {
    const r = await validate(
      {
        a: '',
        b: 'hello',
      },
      {
        a: R.nullable().string().alpha(),
        b: R.nullable().string().alpha(),
      }
    );
    expect(r.a).toBeUndefined();
    expect(r.b).toBe('hello');
  });
});

describe('required', function () {
  test('null values should throw ValidateError', async function () {
    const cases = ['', null, undefined, NaN];
    expect.assertions(cases.length * 2);
    for (const c of cases) {
      try {
        await validate(c, R.required());
      } catch (e) {
        expect(e).toBeInstanceOf(ValidateError);
        expect(e.message).toContain('is required');
      }
    }
  });
  test('empty values should not throw', async function () {
    const cases = [{}, [], 0, false];
    expect.assertions(cases.length);
    for (const c of cases) {
      await expect(validate(c, R.required())).resolves.toBeDefined();
    }
  });
  test('requiredIf', function () {
    expect(
      validate(
        { abc: undefined, def: undefined },
        {
          abc: R.requiredIf((data, prop, parent: any) => parent?.def == null),
        }
      )
    ).rejects.toThrow('abc is required');
    expect(
      validate(
        { abc: 123, def: undefined },
        {
          abc: R.requiredIf((data, prop, parent: any) => parent?.def == null),
        }
      )
    ).resolves.toEqual({ abc: 123 });
    expect(
      validate(
        { abc: undefined, def: 123 },
        {
          abc: R.requiredIf((data, prop, parent: any) => parent?.def == null),
        }
      )
    ).resolves.toEqual({});
  });
});
