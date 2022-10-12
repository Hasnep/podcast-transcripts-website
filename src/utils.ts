export const compareStrings = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export const findOrError = <T>(
  array: Array<T>,
  predicate: (arg0: T) => boolean,
  errorMessage: string
): T => {
  const output = array.find(predicate);
  if (typeof output == "undefined") {
    throw Error(errorMessage);
  }
  return output;
};
