import _ from 'lodash';
import BaseRule from './BaseRule';
import { Rules, Validator } from '../Chain';
import { ValidateError } from '../ValidateError';
import { _validate } from '../validate';

export default class ObjectRule extends BaseRule {
  constructor(chain: Validator[], message: string) {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (_.isObjectLike(data)) {
        return { data };
      }
      throw ValidateError.make(prop, message);
    });
  }

  public subRules(rules: Rules) {
    this.chain.push(async (data: object, prop: string) => ({ data: await _validate(data, rules, prop) }));
    return this;
  }
}
