import { ValidateThrough, Validator } from '../Chain';
import ValidateError from '../ValidateError';

export default class BaseRule {
  protected chain: Validator[] = [];

  constructor(chain: Validator[]) {
    this.chain = chain;
  }

  public getChain(): Validator[] {
    return this.chain;
  }

  public custom(validator: ValidateThrough, message: string = ':x is invalid') {
    this.chain.push(async (data, prop, parent) => {
      const r = await validator(data, prop, parent);
      if (typeof r === 'object') {
        return r;
      }
      if (r === false) {
        throw ValidateError.make(prop, message);
      }
      return { data };
    });
    return this;
  }
}
