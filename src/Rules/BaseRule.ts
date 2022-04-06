import { Validator } from '../Chain';
import ValidateError from '../ValidateError';

export default class BaseRule {
  protected chain: Validator[] = [];

  constructor(chain: Validator[]) {
    this.chain = chain;
  }

  public getChain(): Validator[] {
    return this.chain;
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
