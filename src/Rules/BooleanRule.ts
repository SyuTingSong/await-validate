import BaseRule from './BaseRule';
import { Validator } from '../Chain';
import { ValidateError } from '../ValidateError';

export default class BooleanRule extends BaseRule {
  constructor(chain: Validator[], message: string) {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (typeof data === 'boolean') {
        return { data };
      }
      if (data == null) {
        return { data: false };
      }
      if (typeof data === 'string') {
        if (['yes', 'on', '1', 'true'].indexOf(data.toLowerCase()) !== -1) {
          return { data: true };
        } else if (['no', 'off', '0', 'false', ''].indexOf(data.toLowerCase()) !== -1) {
          return { data: false };
        }
        throw ValidateError.make(prop, message);
      }
      if (typeof data === 'number') {
        return { data: !Number.isNaN(data) && data !== 0 };
      }

      throw ValidateError.make(prop, message);
    });
  }
}
