export const isArrayUnique = <T>(array: T[], mapFnOrKey?: keyof T | ((t: T) => unknown)): boolean =>
  new Set(
    mapFnOrKey == null
      ? array
      : array.map(typeof mapFnOrKey === 'function' ? mapFnOrKey : (v) => v[mapFnOrKey]),
  ).size === array.length;

export function findDuplicates<T>(array: T[] | null | undefined, max?: number): T[];
export function findDuplicates<T>(
  array: T[] | null | undefined,
  mapFnOrKey?: keyof T | ((t: T) => unknown),
  max?: number,
): T[];
export function findDuplicates<T>(
  array: T[] | null | undefined,
  mapFnOrKey?: number | keyof T | ((t: T) => unknown),
  max = Number.POSITIVE_INFINITY,
): T[] {
  if (!array) {
    return [];
  }
  const maxFinal = typeof mapFnOrKey === 'number' ? mapFnOrKey : max;

  const result: T[] = [];
  const seen = new Map<unknown, number>();
  for (const item of array) {
    const itemProcessed =
      typeof mapFnOrKey === 'function'
        ? mapFnOrKey(item)
        : mapFnOrKey == null || typeof mapFnOrKey === 'number'
          ? item
          : item[mapFnOrKey];
    let seenTimes = 0;
    if (seen.has(itemProcessed)) {
      seenTimes = seen.get(itemProcessed) || 0;
      if (seenTimes === 1 && result.length < maxFinal) {
        result.push(item);
      }
    }
    seen.set(itemProcessed, seenTimes + 1);
  }
  return result;
}
