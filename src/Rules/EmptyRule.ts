import _ from 'lodash';
import { T } from './TypeRuleChains';
import { ValidateError } from '../ValidateError';

export const R = {
  nullable: () =>
    T([
      async (data: unknown, prop: string) => {
        if (data == null || data === '') {
          return { data: undefined, skip: true };
        }
        return { data };
      },
    ]),
  required: (message: string = ':x is required') =>
    T([
      async (data: unknown, prop: string) => {
        if (typeof data === 'number' && !Number.isNaN(data)) {
          return { data };
        }
        if (_.isEmpty(data)) {
          throw ValidateError.make(prop, message);
        }
        return { data };
      },
    ]),
};
export default R;
