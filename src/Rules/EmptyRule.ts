import { T } from './TypeRuleChains';
import { ValidateError } from '../ValidateError';

export const R = {
  nullable: () =>
    T([
      async (data: unknown) => {
        if (data == null || data === '' || Number.isNaN(data)) {
          return { data: undefined, skip: true };
        }
        return { data };
      },
    ]),
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
};
export default R;
