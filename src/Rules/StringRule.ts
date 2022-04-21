import _ from 'lodash';
import validator from 'validator';
import { Validator } from '../Chain';
import { ValidateError } from '../ValidateError';
import BaseRule from './BaseRule';
import type { IsURLOptions } from 'validator/lib/isURL';
import type { MobilePhoneLocale } from 'validator/lib/isMobilePhone';

export default class StringRule extends BaseRule {
  constructor(chain: Validator[], message: string) {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (data == null) {
        return { data: '' };
      }
      if (typeof data === 'string') {
        return { data };
      }
      if (_.isObject(data) && typeof data.toString === 'function') {
        return { data: `${data}` };
      }
      if (typeof data === 'number' && !Number.isNaN(data)) {
        return { data: `${data}` };
      }
      throw ValidateError.make(prop, message);
    });
  }

  trim() {
    this.chain.push(async (data: string) => {
      return { data: data.trim() };
    });
    return this;
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
    return this;
  }

  date(msg: string = ':x is not a valid date') {
    this.chain.push(async (data: string, prop: string) => {
      if (!Number.isNaN(Date.parse(data))) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  dateFormat(format: string, msg: string = ':x is not a date string match :format') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isDate(data, { format, strictMode: true })) {
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

  mobile(
    locale: MobilePhoneLocale | MobilePhoneLocale[] = 'zh-CN',
    msg: string = ':x is not a valid mobile phone number'
  ) {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isMobilePhone(data, locale)) {
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

  slug(msg: string = ':x cannot be a valid slug') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isSlug(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  url(options?: IsURLOptions, msg: string = ':x is not a valid url') {
    this.chain.push(async (data: string, prop: string) => {
      if (validator.isURL(data, options)) {
        return { data };
      }
      throw ValidateError.make(prop, msg);
    });
    return this;
  }

  match(pattern: RegExp, msg: string = ':x is not match the given pattern :pattern') {
    this.chain.push(async (data: string, prop: string) => {
      if (pattern.test(data)) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { pattern });
    });
    return this;
  }

  minLength(len: number, msg: string = ':x should have at least :len chars') {
    this.chain.push(async (data: string, prop) => {
      if (data.length >= len) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { len });
    });
    return this;
  }

  maxLength(len: number, msg: string = ':x should have no more than :len chars') {
    this.chain.push(async (data: string, prop) => {
      if (data.length <= len) {
        return { data };
      }
      throw ValidateError.make(prop, msg, { len });
    });
    return this;
  }

  lengthBetween(min: number, max: number, msg: string = ':x should have :min to :max chars') {
    this.chain.push(async (data: string, prop) => {
      if (data.length <= max && data.length >= min) {
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
