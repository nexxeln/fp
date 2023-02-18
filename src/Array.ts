import { type Option, some, none } from "./Option.ts";

/**
 * Returns true if all elements in the array match the predicate, false otherwise.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate function to run on each element
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.all((n) => n > 0)
 * );
 *
 * const y = pipe(
 *   ["hi", "hello", "howdy", "bye", "hey there"],
 *   A.all((str) => str.startsWith("h"))
 * );
 *
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function all<T>(array: T[], predicate: (value: T) => boolean): boolean;
export function all<T>(
  predicate: (value: T) => boolean
): (array: T[]) => boolean;
export function all<T>(
  arrayOrPredicate: T[] | ((value: T) => boolean),
  predicate?: (value: T) => boolean
): boolean | ((array: T[]) => boolean) {
  return arguments.length === 1
    ? (array: T[]) => all(array, arrayOrPredicate as (value: T) => boolean)
    : (arrayOrPredicate as T[]).every(predicate as (value: T) => boolean);
}

/**
 * Returns true if any element in the array matches the predicate, false otherwise.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate function to run on each element
 *
 * @example
 * ```
 * const x = pipe(
 *   ["hi", "hello", "howdy", "bye", "hey there"],
 *   A.any((str) => str.startsWith("h"))
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.any((n) => n < 0)
 * );
 *
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function any<T>(array: T[], predicate: (value: T) => boolean): boolean;
export function any<T>(
  predicate: (value: T) => boolean
): (array: T[]) => boolean;
export function any<T>(
  arrayOrPredicate: T[] | ((value: T) => boolean),
  predicate?: (value: T) => boolean
): boolean | ((array: T[]) => boolean) {
  return arguments.length === 1
    ? (array: T[]) => any(array, arrayOrPredicate as (value: T) => boolean)
    : (arrayOrPredicate as T[]).some(predicate as (value: T) => boolean);
}

/**
 * Returns a new array with the element appended to the end.
 *
 * @param array - The array to operate on
 * @param element - The element to append to the array
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.append(6));
 *
 * const y = pipe(["hi", "hello", "howdy"], A.append("bye"));
 *
 * assertEquals(x, [1, 2, 3, 4, 5, 6]);
 * assertEquals(y, ["hi", "hello", "howdy", "bye"]);
 * ```
 */
export function append<T>(array: T[], element: T): T[];
export function append<T>(element: T): (array: T[]) => T[];
export function append<T>(
  arrayOrElement: T[] | T,
  element?: T
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => append(array, arrayOrElement as T)
    : [...(arrayOrElement as T[]), element as T];
}

/**
 * Returns an Option of Some type if an element is present at the given index, or None if the there is no element at the given index.
 *
 * @param array - The array to operate on
 * @param index - The index of the element to return
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.at(2),
 *   O.unwrapOr(0)
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.at(10),
 *   O.match(
 *     (n) => `${n} is at index 10`,
 *     () => "No element at index 10"
 *   )
 * );
 *
 * assertEquals(x, 3);
 * assertEquals(y, "No element at index 10");
 * ```
 */
export function at<T>(array: T[], index: number): Option<T>;
export function at<T>(index: number): (array: T[]) => Option<T>;
export function at<T>(
  arrayOrIndex: T[] | number,
  index?: number
): Option<T> | ((array: T[]) => Option<T>) {
  if (arguments.length === 1) {
    return (array: T[]) => at(array, arrayOrIndex as number);
  }

  return (arrayOrIndex as T[])[index as number] === undefined
    ? none
    : some((arrayOrIndex as T[])[index as number]);
}
