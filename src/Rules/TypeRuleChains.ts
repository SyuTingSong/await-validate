import { Validator } from '../Chain';
import StringRule from './StringRule';
import { FloatRule, IntegerRule } from './NumberRules';
import ArrayRule from './ArrayRule';
import ObjectRule from './ObjectRule';

export const T = (chain: Validator[] = []) => ({
  string: (message: string = ':x must be a string') => new StringRule(chain, message),
  integer: (message: string = ':x must be an integer') => new IntegerRule(chain, message),
  float: (message: string = ':x must be a float number') => new FloatRule(chain, message),
  array: (message: string = ':x must be an array') => new ArrayRule(chain, message),
  object: (message: string = ':x must be an object') => new ObjectRule(chain, message),
  getChain: () => chain,
});
T.string = (message: string = ':x must be a string') => new StringRule([], message);
T.integer = (message: string = ':x must be an integer') => new IntegerRule([], message);
T.float = (message: string = ':x must be a float number') => new FloatRule([], message);
T.array = (message: string = ':x must be an array') => new ArrayRule([], message);
T.object = (message: string = ':x must be an object') => new ObjectRule([], message);

export default T;
