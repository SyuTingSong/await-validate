import validate, { R, T } from '../src/index';

describe('object type validator', function () {
  test('invalid object', function () {
    expect(validate(123, T.object())).rejects.toThrow('must be an object');
  });

  test('object sub rules', function () {
    expect(
      validate(
        {
          a: {
            abc: 123,
            def: 'hello',
          },
          b: [1, 2, 3],
        },
        {
          a: T.object().subRules({
            abc: T.integer().ge(100),
            def: T.string().alpha(),
          }),
          b: T.array().subRules(T.integer().gt(0)),
        }
      )
    ).resolves.toEqual({
      a: {
        abc: 123,
        def: 'hello',
      },
      b: [1, 2, 3],
    });
  });

  test('sub path for object', function () {
    expect(
      validate(
        {
          a: {
            abc: 123,
            def: 'hello',
          },
          b: [1, 2, 3],
        },
        {
          a: R.required()
            .object()
            .subRules({
              abc: R.required().integer().ge(100),
              def: R.required().string().startsWith('ABC'),
            }),
          b: R.required().array().subRules(R.required().integer().gt(0)),
        }
      )
    ).rejects.toThrow('a.def');
  });
});
