import T from './Rules/TypeRuleChains';
import R from './Rules/EmptyRule';
import { Chainable } from './Chain';

async function validate<ReturnType = any>(
  params: { [key: string]: any },
  rules: { [key: string]: Chainable }
): Promise<ReturnType> {
  return;
}

export { T, R, validate };
