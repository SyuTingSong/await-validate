import { Validator } from '../Chain';
import StringRule from './StringRule';
import { FloatRule, IntegerRule } from './NumberRules';

export const T = (chain: Validator[] = []) => ({
  string: (message: string = ':x must be a string') => new StringRule(chain, message),
  integer: (message: string = ':x must be an integer') => new IntegerRule(chain, message),
  float: (message: string = ':x must be a float number') => new FloatRule(chain, message),
  getChain: () => chain,
});

export default T;
