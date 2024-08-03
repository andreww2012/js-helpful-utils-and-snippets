import {mapValues, omit, toPath} from 'lodash-es';

const omitInternal = (obj: unknown, pathArrays: string[][]) => {
  let currObj = obj;

  for (const pathArray of pathArrays) {
    const [keyToOmit, ...restPath] = pathArray;
    if (currObj === null || typeof currObj !== 'object' || keyToOmit == null) {
      continue;
    }

    if (Array.isArray(currObj)) {
      const keyInteger = Number.parseInt(keyToOmit, 10);
      const isArrayIndex =
        Number.isInteger(keyInteger) && keyInteger >= 0 && keyInteger < currObj.length;
      if (!isArrayIndex) {
        currObj = currObj.map((item) => omitInternal(item, pathArrays));
        continue;
      }

      const newArray = [...currObj.slice(0, keyInteger), ...currObj.slice(keyInteger + 1)];
      if (restPath.length > 0) {
        newArray[keyInteger] = omitInternal(currObj[keyInteger], [restPath]);
      }
      currObj = newArray;
      continue;
    }

    if (restPath.length === 0) {
      currObj = omit(currObj, keyToOmit);
      continue;
    }

    currObj = mapValues(currObj, (value, key) => {
      if (key === keyToOmit) {
        return omitInternal(value, [restPath]);
      }
      return value;
    });
  }

  return currObj;
};

/**
 * Improved version of `lodash`'s `omit` that supports removing in array of objects.
 * @example
 * ```ts
 * const input = {a: [{b: 1}, {b: 2, c: 1}, {b: 3}], b: 2};
 * const output = omitImproved(input, 'a.b'); // {a: [{}, {c: 1}, {}], b: 2}
 * ```
 */
export const omitImproved = <T extends object>(
  obj: T | null | undefined,
  ...paths: (string | string[])[]
): Partial<T> => {
  const pathArrays = paths.flat().map((path) => toPath(path));
  return omitInternal(obj, pathArrays) as Partial<T>;
};
