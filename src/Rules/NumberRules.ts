import BaseRule from './BaseRule';
import { ValidateError } from '../ValidateError';
import { Validator } from '../Chain';
import _ from 'lodash';
import validator from 'validator';

class NumberRule extends BaseRule {
  public gt(n: number, msg: string = ':x must be greater than :n') {
    this.chain.push(async (data, prop) => {
      if (data > n) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { n });
    });
    return this;
  }

  public ge(n: number, msg: string = ':x must be greater than or equals to :n') {
    this.chain.push(async (data, prop: string) => {
      if (data >= n) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { n });
    });
    return this;
  }

  public lt(n: number, msg: string = ':x must be less than :n') {
    this.chain.push(async (data, prop) => {
      if (data < n) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { n });
    });
    return this;
  }

  public le(n: number, msg: string = ':x must be less than or equals to :n') {
    this.chain.push(async (data, prop) => {
      if (data <= n) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { n });
    });
    return this;
  }

  public between(min: number, max: number, msg = ':x must between :min and :max') {
    this.chain.push(async (data, prop) => {
      if (data >= min && data <= max) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { min, max });
    });
    return this;
  }

  public inEnum(set: Array<string | number>, message: string = ':x must in enum of :set') {
    const s = new Set(set);
    this.chain.push(async (data: any, prop) => {
      if (s.has(data)) {
        return { data };
      }
      throw ValidateError.make(prop, message, { set });
    });
    return this;
  }
}

export class FloatRule extends NumberRule {
  constructor(chain: Validator[] = [], msg: string = ':x must be a number') {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (_.isString(data) && validator.isFloat(data)) {
        data = parseFloat(`${data}`);
      }
      if (typeof data === 'number' && !Number.isNaN(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
  }
}

export class IntegerRule extends NumberRule {
  constructor(chain: Validator[], message: string) {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (_.isString(data) && validator.isInt(data)) {
        data = parseInt(data);
      }
      if (typeof data === 'number' && Number.isInteger(data)) {
        return { data };
      }
      throw ValidateError.make(prop, message);
    });
  }
}
