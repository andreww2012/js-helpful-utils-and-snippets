/**
 * A utility type that takes an object type and makes the hover overlay more readable.
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};

/**
 * A utility type that takes an object type and makes the hover overlay more readable. Shallow (non-recursive) version.
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type PrettifyShallow<T> = {
  [K in keyof T]: T[K];
} & {};
