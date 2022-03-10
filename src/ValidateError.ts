import _ from 'lodash';

export type StringLike = string | number | { toString: () => string };

export class ValidateError extends Error {
  constructor(message: string, public readonly prop: string) {
    super(message);
  }

  public static make(prop: string, template: string, replacement: { [key: string]: StringLike } = {}): ValidateError {
    replacement['x'] = prop;
    const message = _.reduce(replacement, (prev, val, key) => _.replace(prev, `:${key}`, `${val}`), template);
    return new ValidateError(message, prop);
  }
}

export default ValidateError;
