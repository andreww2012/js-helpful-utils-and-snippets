/**
 * Groups collection elements only they are next to each other, meaning that there might be duplicate groups.
 */
export function groupByLocally<T>(
  collection: T[],
  groupKeyFn: (value: T) => string,
  withoutKeys?: false,
): [key: string, values: T[]][];
export function groupByLocally<T>(
  collection: T[],
  groupKeyFn: (value: T) => string,
  withoutKeys: true,
): T[][];
export function groupByLocally<T>(
  collection: T[],
  groupKeyFn: (value: T) => string,
  withoutKeys?: boolean,
) {
  const result: (T[] | [key: string, values: T[]])[] = [];

  let i = -1;
  let prevKey: string | undefined;
  for (const currElem of collection) {
    i += 1;
    const key = groupKeyFn(currElem);
    // `key` can be `undefined`, but `result.length` is 0 on the first iteration, hence `i > 0`
    if (i > 0 && key === prevKey) {
      const group = result.at(-1);
      if (withoutKeys) {
        (group as T[]).push(currElem);
      } else {
        (group as [string, T[]])[1].push(currElem);
      }
    } else {
      result.push(withoutKeys ? [currElem] : [key, [currElem]]);
    }
    prevKey = key;
  }

  return result;
}
