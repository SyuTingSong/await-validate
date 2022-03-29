import _ from 'lodash';
import BaseRule from './BaseRule';
import { Rules, Validator } from '../Chain';
import { ValidateError } from '../ValidateError';
import { _validate } from '../validate';

export default class ArrayRule extends BaseRule {
  constructor(chain: Validator[], message: string = ':x must be an array') {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (_.isArrayLike(data)) {
        return { data };
      }
      throw ValidateError.make(prop, message);
    });
  }

  minLength(n: number, message: string = ':x should have at least :n members') {
    this.chain.push(async (data: ArrayLike<any>, prop: string) => {
      if (data.length < n) {
        throw ValidateError.make(prop, message, { n });
      }
      return { data };
    });
    return this;
  }

  maxLength(n: number, message: string = ':x should have at most :n members') {
    this.chain.push(async (data: ArrayLike<any>, prop: string) => {
      if (data.length > n) {
        throw ValidateError.make(prop, message, { n });
      }
      return { data };
    });
    return this;
  }

  subRules(rules: Rules) {
    this.chain.push(async (data: Array<any>, prop: string) => {
      const validated = [];
      for (const element of data) {
        const validatedElement = await _validate(element, rules, prop);
        validated.push(validatedElement);
      }
      return { data: validated };
    });
    return this;
  }
}
