export type Validator<T = unknown> = (data: T, prop: string) => Promise<{ data: T; skip?: boolean }>;
export type Chain<T = unknown> = Validator<T>[];
export type Chainable<T = unknown> = {
  getChain(): Chain<T>;
};
