import {get, set} from 'lodash-es';

// eslint-disable-next-line unicorn/better-regex
const ARRAY_PUSH_OPERATOR_REGEX = /\[\]/g;

/**
 * Improved version of lodash's `set` function that allows to set nested values
 * using array push operator (`[]`) in the path.
 *
 * @example
 * setImproved({ foo: { bar: [1] } }, "foo.bar[]", 2); // { foo: { bar: [1, 2] } }
 */
export const setImproved = <T extends object>(object: T, path: string, value: unknown): T => {
  const matches = [...path.matchAll(ARRAY_PUSH_OPERATOR_REGEX)];

  let fixedPath = path.slice(0, matches[0]?.index);

  matches.forEach(({0: match, index = 0}, matchIndex) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const currValue = get(object, fixedPath);
    fixedPath += Array.isArray(currValue)
      ? `[${currValue.length}]`
      : `${match}${path.slice(index + match.length, matches[matchIndex + 1]?.index)}`;
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return set(object, fixedPath, value);
};
