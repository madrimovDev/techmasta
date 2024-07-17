type ExcludeProperties = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keysToExclude: K[],
) => Omit<T, K>;

export const excludeProperties: ExcludeProperties = (obj, keysToExclude) => {
  const newObj = { ...obj };
  keysToExclude.forEach((key) => delete newObj[key]);
  return newObj;
};
