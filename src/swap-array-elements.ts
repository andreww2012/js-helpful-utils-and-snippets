export const swap = <T>(array: T[], i: number, j: number) => {
  const temp = array[i] as T;
  array[i] = array[j] as T;
  array[j] = temp;
  return array;
};
