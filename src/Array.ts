export function all<T>(array: T[], predicate: (value: T) => boolean): boolean;
export function all<T>(
  predicate: (value: T) => boolean
): (array: T[]) => boolean;
export function all<T>(
  arrayOrPredicate: T[] | ((value: T) => boolean),
  predicate?: (value: T) => boolean
): boolean | ((array: T[]) => boolean) {
  if (arguments.length === 1) {
    return (array: T[]) =>
      all(array, arrayOrPredicate as (value: T) => boolean);
  }
  return (arrayOrPredicate as T[]).every(predicate as (value: T) => boolean);
}
