export const liftArrayValues = <T>(
  array: T[] | null | undefined,
  condition: (value: T, index: number, array: T[]) => boolean,
  options: {inPlace?: boolean; reverse?: boolean} = {},
): T[] => {
  const {inPlace, reverse} = options;

  const lifted: T[] = [];
  const normal: T[] = [];
  const arrayFixed = array || [];

  let i = -1;
  for (const value of arrayFixed) {
    i += 1;

    if (condition(value, i, arrayFixed)) {
      lifted.push(value);
    } else {
      normal.push(value);
    }
  }

  const result = inPlace ? array || [] : reverse ? [...normal, ...lifted] : [...lifted, ...normal];

  if (inPlace) {
    array?.splice(0, (reverse ? normal : lifted).length, ...(reverse ? normal : lifted));
    array?.splice(
      (reverse ? normal : lifted).length,
      (reverse ? lifted : normal).length,
      ...(reverse ? lifted : normal),
    );
  }

  return result;
};
