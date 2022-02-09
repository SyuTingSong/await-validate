import _ from 'lodash';
import validator from 'validator';
import { Validator } from '../Chain';
import { ValidateError } from '../ValidateError';
import BaseRule from './BaseRule';

export default class StringRule extends BaseRule {
  constructor(chain: Validator[], message: string) {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (_.isString(data)) {
        return { data: `${data}` };
      }
      throw ValidateError.make(prop, message);
    });
  }

  startsWith(needle: string, msg: string = ':x must starts with :needle') {
    this.chain.push(async (data: string, prop: string) => {
      if (_.startsWith(data, needle)) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { needle });
    });
    return this;
  }

  endsWith(needle: string, msg: string = ':x must ends with :needle') {
    this.chain.push(async (data: string, prop: string) => {
      if (_.endsWith(data, needle)) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { needle });
    });
    return this;
  }

  email(msg: string = ':x must be an Email address') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isEmail(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  ipv4(msg: string = ':x must be an IPv4 address') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isIP(data, 4)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  ipv6(msg: string = ':x must be an IPv6 address') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isIP(data, 6)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
  }

  date(msg: string = ':x is not a valid date') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isDate(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  dateFormat(format: string, msg: string = ':x is not a date string match :format') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isDate(data, { format })) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { format });
    });
    return this;
  }

  contains(needle: string, msg: string = ':x must contains :needle') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.contains(data, needle)) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { needle });
    });
    return this;
  }

  mobile(msg: string = ':x is not a valid mobile number in China') {
    this.chain.push(async (data: string, prop: string) => {
      if (/^1{3-9}\d{9}$/.test(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  alpha(msg: string = ':x must be an alphabetic string') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isAlpha(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  alphanumeric(msg: string = ':x must be an alphanumeric string') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isAlphanumeric(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }
}
