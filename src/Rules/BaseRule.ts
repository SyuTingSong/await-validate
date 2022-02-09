import { Validator } from '../Chain';

export default class BaseRule {
  protected chain: Validator[] = [];

  constructor(chain: Validator[]) {
    this.chain = chain;
  }

  public getChain(): Validator[] {
    return this.chain;
  }
}
