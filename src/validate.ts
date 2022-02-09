import { isChainable, Rules, Validator } from './Chain';

async function validateChain<R>(chain: Validator[], data: unknown, prop: string, prefix: string): Promise<R> {
  let tData = data;
  for (const v of chain) {
    const r = await v(tData, prefix ? `${prefix}.${prop}` : prop);
    tData = r.data;
    if (r.skip) {
      break;
    }
  }
  return tData as R;
}

export async function _validate<R = any>(data: unknown, rules: Rules, prefix: string): Promise<R> {
  if (isChainable(rules)) {
    return validateChain<R>(rules.getChain(), data, 'x', prefix);
  }
  const result = {};
  for (const prop of Object.keys(rules)) {
    result[prop] = await validateChain<R>(rules[prop].getChain(), data[prop], prop, prefix);
  }
  return result as R;
}

export default async function validate<R = any>(data: unknown, rules: Rules): Promise<R> {
  return _validate<R>(data, rules, '');
}
