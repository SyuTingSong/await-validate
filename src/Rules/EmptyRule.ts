import { T } from './TypeRuleChains';
import { ValidateError } from '../ValidateError';
import { ValidateThrough } from '../Chain';

const nullable = () =>
  T([
    async (data: unknown) => {
      if (data == null || data === '' || Number.isNaN(data)) {
        return { data: undefined, skip: true };
      }
      return { data };
    },
  ]);

export const R = {
  nullable,
  optional: nullable,
  required: (message: string = ':x is required') =>
    T([
      async (data: unknown, prop: string) => {
        if (data == null || data === '' || Number.isNaN(data)) {
          throw ValidateError.make(prop, message);
        }
        return { data };
      },
    ]),
  requiredIf: (
    fn: (data: unknown, prop: string, parent?: unknown) => boolean | Promise<boolean>,
    message: string = ':x is required'
  ) =>
    T([
      async (data: unknown, prop: string, parent?: unknown) => {
        if (data == null || data === '' || Number.isNaN(data)) {
          if (await fn(data, prop, parent)) {
            throw ValidateError.make(prop, message);
          } else {
            return { data: undefined, skip: true };
          }
        }
        return { data };
      },
    ]),
  custom: (validator: ValidateThrough, message: string = ':x is invalid') =>
    T([
      async (data: unknown, prop: string, parent?: unknown) => {
        const r = await validator(data, prop, parent);
        if (typeof r === 'object') {
          return r;
        }
        if (r === false) {
          throw ValidateError.make(prop, message);
        }
        return { data };
      },
    ]),
};
export default R;
