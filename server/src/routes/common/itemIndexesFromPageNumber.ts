/* If client asks page 2 of jackets, we'll count and return starting and ending indexes */

export const itemIndexesFromPageNumber = (
  page: number,
  numberOfProducts: number = 10
): { start: number; end: number } => {
  const start = (page - 1) * numberOfProducts;
  const end = start + numberOfProducts;

  return { start, end };
};
