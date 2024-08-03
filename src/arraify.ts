export type MaybeArray<T> = T | T[];

/**
 * If the value is an array, return it. Otherwise, return an array with the value as the only element. If the value is nullish, return an empty array.
 */
export const arraify = <T>(value?: MaybeArray<T> | null | undefined): T[] =>
  Array.isArray(value) ? value : value == null ? [] : [value];
