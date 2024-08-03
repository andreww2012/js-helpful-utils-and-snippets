export const splitArrayByChunkOfSizes = <T>(array: T[], chunkSizes: number[]): T[][] => {
  let i = 0;
  let j = -1;
  const chunks: T[][] = [];

  while (i < array.length) {
    chunks.push(array.slice(i, (i += chunkSizes[(j += 1) % chunkSizes.length] || 0)));
  }

  return chunks;
};
