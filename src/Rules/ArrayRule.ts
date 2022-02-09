import BaseRule from './BaseRule';
import { Validator } from '../Chain';
import _ from 'lodash';

export default class ArrayRule extends BaseRule {
  constructor(chain: Validator[], message: string = ':x must be an array') {
    super(chain);
    this.chain.push(async (data: unknown, prop: string) => {
      if (_.isArrayLike(data)) {
      }
    });
  }
}
