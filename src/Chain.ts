export type Validator<T = unknown> = (data: T, prop: string) => Promise<{ data: T; skip?: boolean }>;
export type Chainable<T = unknown> = {
  getChain(): Validator<T>[];
};
export type Rules = Chainable | { [prop: string]: Chainable };

export function isChainable(o: unknown): o is Chainable {
  return o != null && typeof o === 'object' && typeof o['getChain'] === 'function';
}
