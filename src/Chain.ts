export type Validator<T = unknown> = (data: T, prop: string, parent?: unknown) => Promise<{ data: T; skip?: boolean }>;
export type ValidateThrough<T = unknown> = (
  data: T,
  prop: string,
  parent?: unknown
) => Promise<boolean | { data: T; skip?: boolean }>;
export type Chainable<T = unknown> = {
  getChain(): Validator<T>[];
};
export type Rules = Chainable | { [prop: string]: Chainable };

export function isChainable(o: unknown): o is Chainable {
  return o != null && typeof o === 'object' && typeof o['getChain'] === 'function';
}
