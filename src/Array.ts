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

/**
 * Retuns a new array with the other array concatenated to the end of the first array.
 *
 * @param array - The array to operate on
 * @param other - The array to concat to the end of the first array
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3],
 *   A.concat([4, 5])
 * );
 *
 * assertEquals(x, [1, 2, 3, 4, 5]);
 * ```
 */
export function concat<T>(array: T[], other: T[]): T[];
export function concat<T>(other: T[]): (array: T[]) => T[];
export function concat<T>(
  arrayOrOther: T[],
  other?: T[]
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => concat(array, arrayOrOther)
    : [...arrayOrOther, ...(other as T[])];
}

/**
 * Returns a new clone of the array.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = A.clone([1, 2, 3, 4, 5]);
 *
 * assertEquals(x, [1, 2, 3, 4, 5]);
 * ```
 */
export function clone<T>(array: T[]): T[] {
  return [...array];
}

/**
 * Returns a new array containing the elements of the array that are not present in the other array.
 *
 * @param array - The array to operate on
 * @param other - The array to compare to
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.diff([1, 2, 3])
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.diff([1, 2, 3, 4, 5])
 * );
 *
 * assertEquals(x, [4, 5]);
 * assertEquals(y, []);
 * ```
 */
export function diff<T>(array: T[], other: T[]): T[];
export function diff<T>(other: T[]): (array: T[]) => T[];
export function diff<T>(
  arrayOrOther: T[],
  other?: T[]
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => diff(array, arrayOrOther)
    : arrayOrOther.filter((e) => !(other as T[]).includes(e));
}

/**
 * Retuns a new array which is an Option of Some type with n elements dropped from the beginning of the array. None is returned if n is greater than the length of the array or negative.
 *
 * @param array - The array to operate on
 * @param n - The number of elements to drop from the beginning of the array
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.drop(2), O.unwrapOr([] as number[]));
 * const y = pipe([1, 2, 3, 4, 5], A.drop(10), O.unwrapOr([] as number[]));
 * const z = pipe([1, 2, 3, 4, 5], A.drop(-1), O.unwrapOr([] as number[]));
 *
 * assertEquals(x, [3, 4, 5]);
 * assertEquals(y, []);
 * assertEquals(z, []);
 * ```
 */
export function drop<T>(array: T[], n: number): Option<T[]>;
export function drop<T>(n: number): (array: T[]) => Option<T[]>;
export function drop<T>(
  arrayOrN: T[] | number,
  n?: number
): Option<T[]> | ((array: T[]) => Option<T[]>) {
  if (arguments.length === 1) {
    return (array: T[]) => drop(array, arrayOrN as number);
  }

  return n! < 0 || n! > (arrayOrN as T[]).length
    ? none
    : some((arrayOrN as T[]).slice(n!));
}

/**
 * Returns a new array containing the elements of the array that satisfy the predicate.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate to filter the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.filter((n) => n % 2 === 0)
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.filter((_, i) => i % 2 === 0)
 * );
 *
 * assertEquals(x, [2, 4]);
 * assertEquals(y, [1, 3, 5]);
 * ```
 */
export function filter<T>(
  array: T[],
  predicate: (value: T, index: number) => boolean
): T[];
export function filter<T>(
  predicate: (value: T, index: number) => boolean
): (array: T[]) => T[];
export function filter<T>(
  arrayOrPredicate: T[] | ((value: T, index: number) => boolean),
  predicate?: (value: T, index: number) => boolean
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) =>
        filter(array, arrayOrPredicate as (value: T, index: number) => boolean)
    : (arrayOrPredicate as T[]).filter((value, index) =>
        predicate!(value, index)
      );
}

/**
 * Returns an Option of Some type for the first element of the array that satisfies the predicate. None is returned if no element satisfies the predicate.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate to find the element
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.find((x) => x > 3),
 *   O.unwrapOr(0)
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.find((x) => x < 0),
 *   O.unwrapOr(0)
 * );
 *
 * assertEquals(x, 4);
 * assertEquals(y, 0);
 * ```
 */
export function find<T>(
  array: T[],
  predicate: (value: T) => boolean
): Option<T>;
export function find<T>(
  predicate: (value: T) => boolean
): (array: T[]) => Option<T>;
export function find<T>(
  arrayOrPredicate: T[] | ((value: T) => boolean),
  predicate?: (value: T) => boolean
): Option<T> | ((array: T[]) => Option<T>) {
  if (arguments.length === 1) {
    return (array: T[]) =>
      find(array, arrayOrPredicate as (value: T) => boolean);
  }

  const result = (arrayOrPredicate as T[]).find(predicate!);

  return result === undefined ? none : some(result);
}

/**
 * Retuns an Option of Some type for the index of the first element of the array that satisfies the predicate. None is returned if no element satisfies the predicate.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate to find the index of the element
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.findIndex((x) => x > 3),
 *   O.unwrapOr(0)
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.findIndex((x) => x < 0),
 *   O.unwrapOr(0)
 * );
 *
 * assertEquals(x, 3);
 * assertEquals(y, 0);
 * ```
 */
export function findIndex<T>(
  array: T[],
  predicate: (value: T) => boolean
): Option<number>;
export function findIndex<T>(
  predicate: (value: T) => boolean
): (array: T[]) => Option<number>;
export function findIndex<T>(
  arrayOrPredicate: T[] | ((value: T) => boolean),
  predicate?: (value: T) => boolean
): Option<number> | ((array: T[]) => Option<number>) {
  if (arguments.length === 1) {
    return (array: T[]) =>
      findIndex(array, arrayOrPredicate as (value: T) => boolean);
  }

  const result = (arrayOrPredicate as T[]).findIndex(predicate!);

  return result === -1 ? none : some(result);
}

/**
 * Returns a new array with all the sub arrays concatenated into it at a single level of depth.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, [3, 4, [5, 6]], 7, 8],
 *   A.flatten
 * )
 *
 * assertEquals(x, [1, 2, 3, 4, 5, 6, 7, 8]);
 * ```
 */
export function flatten<T>(array: T[]): (T extends (infer U)[] ? U : T)[] {
  return array.reduce(
    (acc, cur) => [...acc, ...(Array.isArray(cur) ? flatten(cur) : [cur])],
    [] as (T extends (infer B)[] ? B : T)[]
  );
}

/**
 * Returns an Option of Some type of the first element of the array and None if the array is empty.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.head, O.unwrapOr(0));
 * const y = pipe([], A.head, O.unwrapOr(0));
 *
 * assertEquals(x, 1);
 * assertEquals(y, 0);
 * ```
 */
export function head<T>(array: T[]): Option<T> {
  return array.length === 0 ? none : some(array[0]);
}

/**
 * Retuns a new array of the intersection of the two arrays.
 *
 * @param array - The array to operate on
 * @param other - The other array that will be used to find the intersection
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.intersection([3, 4, 5, 6, 7])
 * );
 *
 * const y = pipe(
 *   [1, 2, 1, 1, 3],
 *   A.intersection([1])
 * );
 *
 * assertEquals(x, [3, 4, 5]);
 * assertEquals(y, [1]);
 * ```
 */
export function intersection<T>(array: T[], other: T[]): T[];
export function intersection<T>(other: T[]): (array: T[]) => T[];
export function intersection<T>(
  arrayOrOther: T[] | T[],
  other?: T[]
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => intersection(array, arrayOrOther as T[])
    : [...new Set(arrayOrOther)].filter((value) => new Set(other!).has(value));
}

/**
 * Returns a new array with the separator interspersed between each element of the array.
 *
 * @param array - The array to operate on
 * @param separator - The separator to intersperse the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3],
 *   A.intersperse(0)
 * );
 *
 * assertEquals(x, [1, 0, 2, 0, 3]);
 * ```
 */
export function intersperse<T>(array: T[], separator: T): T[];
export function intersperse<T>(separator: T): (array: T[]) => T[];
export function intersperse<T>(
  arrayOrSeparator: T[] | T,
  separator?: T
): T[] | ((array: T[]) => T[]) {
  if (arguments.length === 1) {
    return (array: T[]) => intersperse(array, arrayOrSeparator as T);
  }

  return (arrayOrSeparator as T[]).reduce(
    (acc, cur, index) =>
      index === 0 ? [...acc, cur] : [...acc, separator!, cur],
    [] as T[]
  );
}

/**
 * Returns true if the array is empty, false otherwise.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3], A.isEmpty);
 * const y = pipe([], A.isEmpty);
 *
 * assertEquals(x, false);
 * assertEquals(y, true);
 * ```
 */
export function isEmpty<T>(array: T[]): boolean {
  return array.length === 0;
}

/**
 * Returns false if the array is empty, true otherwise.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3], A.isNonEmpty);
 * const y = pipe([], A.isNonEmpty);
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function isNonEmpty<T>(array: T[]): boolean {
  return array.length !== 0;
}

/**
 * Returns a string of all the elements of the array separated by the separator.
 *
 * @param array - The array to operate on
 * @param separator - The separator to join the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3],
 *   A.join("-")
 * );
 *
 * assertEquals(x, "1-2-3");
 * ```
 */
export function join<T>(array: T[], separator: string): string;
export function join<T>(separator: string): (array: T[]) => string;
export function join<T>(
  arrayOrSeparator: T[] | string,
  separator?: string
): string | ((array: T[]) => string) {
  return arguments.length === 1
    ? (array: T[]) => join(array, arrayOrSeparator as string)
    : (arrayOrSeparator as T[]).join(separator!);
}

/**
 * Retuns an Option of Some type of the last element of the array and None if the array is empty.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.last, O.unwrapOr(0));
 * const y = pipe([], A.last, O.unwrapOr(0));
 *
 * assertEquals(x, 5);
 * assertEquals(y, 0);
 * ```
 */
export function last<T>(array: T[]): Option<T> {
  return array.length === 0 ? none : some(array[array.length - 1]);
}

/**
 * Returns the length of the array.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.length);
 *
 * assertEquals(x, 5);
 * ```
 */
export function length<T>(array: T[]): number {
  return array.length;
}

/**
 * Returns a new array with the result of calling the function on each element of the array.
 *
 * @param array - The array to operate on
 * @param fn - The function to map the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.map((n) => n * 2)
 * );
 *
 * const y = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.map((n, i) => n + i)
 * );
 *
 * assertEquals(x, [2, 4, 6, 8, 10]);
 * assertEquals(y, [1, 3, 5, 7, 9]);
 * ```
 */
export function map<T, U>(array: T[], fn: (value: T, index: number) => U): U[];
export function map<T, U>(
  fn: (value: T, index: number) => U
): (array: T[]) => U[];
export function map<T, U>(
  arrayOrFn: T[] | ((value: T, index: number) => U),
  fn?: (value: T, index: number) => U
): U[] | ((array: T[]) => U[]) {
  return arguments.length === 1
    ? (array: T[]) => map(array, arrayOrFn as (value: T, index: number) => U)
    : (arrayOrFn as T[]).map((value, index) => fn!(value, index));
}

/**
 * Returns an Option of Some type of the maximum value of an array of numbers and None if the array is empty.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.max, O.unwrapOr(0));
 * const y = pipe([], A.max, O.unwrapOr(0));
 *
 * assertEquals(x, 5);
 * assertEquals(y, 0);
 * ```
 */
export function max(array: number[]): Option<number> {
  return array.length === 0 ? none : some(Math.max(...array));
}

/**
 * Returns an Option of Some type of the maximum value of an array of numbers and None if the array is empty.
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.min, O.unwrapOr(0));
 * const y = pipe([], A.min, O.unwrapOr(0));
 *
 * assertEquals(x, 1);
 * assertEquals(y, 0);
 * ```
 */
export function min(array: number[]): Option<number> {
  return array.length === 0 ? none : some(Math.min(...array));
}

/**
 * Returns a tuple of two arrays, the first containing the elements that satisfy the predicate and the second containing the elements that do not satisfy the predicate.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate to partition the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, "a", 2, "b", 3, "c"],
 *   A.partition(G.isNumber)
 * );
 *
 * assertEquals(x, [[1, 2, 3], ["a", "b", "c"]]);
 * ```
 */
export function partition<T, U extends T>(
  array: T[],
  predicate: (value: T, index: number) => value is U
): readonly [U[], Exclude<T, U>[]];
export function partition<T, U extends T>(
  predicate: (value: T, index: number) => value is U
): (array: T[]) => readonly [U[], Exclude<T, U>[]];
export function partition<T>(
  array: T[],
  predicate: (value: T, index: number) => boolean
): readonly [T[], T[]];
export function partition<T>(
  predicate: (value: T, index: number) => boolean
): (array: T[]) => readonly [T[], T[]];
export function partition<T>(
  arrayOrPredicateFn: T[] | ((value: T, index: number) => boolean),
  predicate?: (value: T, index: number) => boolean
): readonly [T[], T[]] | ((array: T[]) => readonly [T[], T[]]) {
  return arguments.length === 1
    ? (array: T[]) =>
        partition(
          array,
          arrayOrPredicateFn as (value: T, index: number) => boolean
        )
    : (arrayOrPredicateFn as T[]).reduce(
        (acc, cur, i) => {
          acc[predicate!(cur, i) ? 0 : 1].push(cur);
          return acc;
        },
        [[], []] as readonly [T[], T[]]
      );
}

/**
 * Returns a new array with the value prepended to the beginning of the array.
 *
 * @param value - The value to prepend to the array
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.prepend(0)
 * );
 *
 * assertEquals(x, [0, 1, 2, 3, 4, 5]);
 * ```
 */
export function prepend<T>(value: T, array: T[]): T[];
export function prepend<T>(value: T): (array: T[]) => T[];
export function prepend<T>(value: T, array?: T[]): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => prepend(value, array)
    : [value, ...array!];
}

/**
 * Returns the product of all the elements in a array of numbers.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.product);
 *
 * assertEquals(x, 120);
 * ```
 */
export function product(array: number[]): number {
  return array.reduce((acc, cur) => acc * cur, 1);
}

/**
 * Reduces an array to a single value by applying a function to each element and accumulating the result.
 *
 * @param array - The array to operate on
 * @param fn - The function to reduce the array with
 * @param initial - The initial value to reduce the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.reduce((acc, cur) => acc + cur, 0)
 * );
 *
 * assertEquals(x, 15);
 * ```
 */
export function reduce<T, U>(
  array: T[],
  fn: (acc: U, value: T, index: number) => U,
  initial: U
): U;
export function reduce<T, U>(
  fn: (acc: U, value: T, index: number) => U,
  initial: U
): (array: T[]) => U;
export function reduce<T, U>(
  arrayOrFn: T[] | ((acc: U, value: T, index: number) => U),
  fnOrInitial: ((acc: U, value: T, index: number) => U) | U,
  initial?: U
): U | ((array: T[]) => U) {
  return arguments.length === 2
    ? (array: T[]) =>
        reduce(
          array,
          arrayOrFn as (acc: U, value: T, index: number) => U,
          fnOrInitial as U
        )
    : (arrayOrFn as T[]).reduce(
        fnOrInitial as (acc: U, value: T, index: number) => U,
        initial as U
      );
}

/**
 * Reduces an array to a single value by applying a function to each element and accumulating the result from right to left.
 *
 * @param array - The array to operate on
 * @param fn - The function to reduce the array with
 * @param initial - The initial value to reduce the array with
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.reduceRight((acc, cur) => acc + cur, 0)
 * );
 *
 * assertEquals(x, 15);
 * ```
 */
export function reduceRight<T, U>(
  array: T[],
  fn: (acc: U, value: T, index: number) => U,
  initial: U
): U;
export function reduceRight<T, U>(
  fn: (acc: U, value: T, index: number) => U,
  initial: U
): (array: T[]) => U;
export function reduceRight<T, U>(
  arrayOrFn: T[] | ((acc: U, value: T, index: number) => U),
  fnOrInitial: ((acc: U, value: T, index: number) => U) | U,
  initial?: U
): U | ((array: T[]) => U) {
  return arguments.length === 2
    ? (array: T[]) =>
        reduceRight(
          array,
          arrayOrFn as (acc: U, value: T, index: number) => U,
          fnOrInitial as U
        )
    : (arrayOrFn as T[]).reduceRight(
        fnOrInitial as (acc: U, value: T, index: number) => U,
        initial as U
      );
}

/**
 * Returns a new array with elements that do not satisfy the provided predicate function.
 *
 * @param array - The array to operate on
 * @param predicate - The predicate function to use to filter the array
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.reject((x) => x % 2 === 0)
 * );
 *
 * assertEquals(x, [1, 3, 5]);
 * ```
 */
export function reject<T>(array: T[], predicate: (value: T) => boolean): T[];
export function reject<T>(
  predicate: (value: T) => boolean
): (array: T[]) => T[];
export function reject<T>(
  arrayOrPredicate: T[] | ((value: T) => boolean),
  predicate?: (value: T) => boolean
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => reject(array, arrayOrPredicate as (value: T) => boolean)
    : (arrayOrPredicate as T[]).filter((value) => !predicate!(value));
}

/**
 * Returns a new array with it's elements reversed.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.reverse);
 *
 * assertEquals(x, [5, 4, 3, 2, 1]);
 * ```
 */
export function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}

/**
 * Retuns a new array with it's elements shuffled.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.shuffle);
 * // x is now a shuffled version of [1, 2, 3, 4, 5]
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
  const xs = [...array];
  return xs.reduce((acc, _, i) => {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [acc[i], acc[randomIndex]] = [acc[randomIndex], acc[i]];
    return acc;
  }, xs);
}

/**
 * Returns a new array with it's elements sorted.
 *
 * @param array - The array to operate on
 * @param compareFn - The compare function to use to sort the array
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.sort((a, b) => b - a)
 * );
 *
 * const y = pipe(
 *   ["b", "a", "c", "e", "d"],
 *   A.sort((a, b) => a.localeCompare(b))
 * );
 *
 * assertEquals(x, [5, 4, 3, 2, 1]);
 * assertEquals(y, ["a", "b", "c", "d", "e"]);
 * ```
 */
export function sort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[];
export function sort<T>(compareFn: (a: T, b: T) => number): (array: T[]) => T[];
export function sort<T>(
  arrayOrCompareFn: T[] | ((a: T, b: T) => number),
  compareFn?: (a: T, b: T) => number
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => sort(array, arrayOrCompareFn as (a: T, b: T) => number)
    : [...(arrayOrCompareFn as T[])].sort(compareFn);
}

/**
 * Returns the sum of all elements in a array of numbers.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.sum);
 *
 * assertEquals(x, 15);
 * ```
 */
export function sum(array: number[]): number {
  return array!.reduce((acc, cur) => acc + cur, 0);
}

/**
 * Returns an Option of Some type of all elements of the array except the first and None if the array is empty.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.tail, O.unwrapOr([0]));
 * const y = pipe([], A.tail, O.unwrapOr([0]));
 * const z = pipe([1], A.tail, O.unwrapOr([0]));
 *
 * assertEquals(x, [2, 3, 4, 5]);
 * assertEquals(y, [0]);
 * assertEquals(z, []);
 * ```
 */
export function tail<T>(array: T[]): Option<T[]> {
  return array.length === 0 ? none : some(array.slice(1));
}

/**
 * Retuns a new array which is an Option of Some type with n elements taken from the beginning of the array. None is returned if n is negative. If n is greater than the length of the array, the entire array is returned.
 *
 * @param array - The array to operate on
 * @param n - The number of elements to take from the array
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5], A.take(3), O.unwrapOr([0]));
 * const y = pipe([1, 2, 3, 4, 5], A.take(-1), O.unwrapOr([0]));
 * const z = pipe([1, 2, 3, 4, 5], A.take(10), O.unwrapOr([0]));
 *
 * assertEquals(x, [1, 2, 3]);
 * assertEquals(y, [0]);
 * assertEquals(z, [1, 2, 3, 4, 5]);
 */
export function take<T>(array: T[], n: number): Option<T[]>;
export function take<T>(n: number): (array: T[]) => Option<T[]>;
export function take<T>(
  arrayOrN: T[] | number,
  n?: number
): Option<T[]> | ((array: T[]) => Option<T[]>) {
  if (arguments.length === 1) {
    return (array: T[]) => take(array, arrayOrN as number);
  }

  return n! < 0 ? none : some((arrayOrN as T[]).slice(0, n!));
}

/**
 * Retuns an Option of Some type of a tuple with the first element of the array (head) and the rest of the array (tail). None is returned if the array is empty.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe(
 *   [1, 2, 3, 4, 5],
 *   A.uncons,
 *   O.map(([head, tail]) => [head, tail.length]),
 *   O.unwrapOr([0, 0])
 * );
 *
 * const y = pipe(
 *   [],
 *   A.uncons,
 *   O.map(([head, tail]) => [head, tail.length]),
 *   O.unwrapOr([0, 0])
 * );
 *
 * assertEquals(x, [1, 4]);
 * assertEquals(y, [0, 0]);
 * ```
 */
export function uncons<T>(array: T[]): Option<readonly [T, T[]]> {
  return array.length === 0 ? none : some([array[0], array.slice(1)]);
}

/**
 * Retuns the union of two arrays.
 *
 * @param array - The array to operate on
 * @param other - The array to union with
 *
 * @example
 * ```
 * const x = pipe([1, 3, 5], A.union([2, 4, 6]));
 * const y = pipe([1, 2, 1, 4], A.union([2, 3, 4]));
 *
 * assertEquals(x, [1, 3, 5, 2, 4, 6]);
 * assertEquals(y, [1, 2, 4, 3]);
 * ```
 */
export function union<T>(array: T[], other: T[]): T[];
export function union<T>(other: T[]): (array: T[]) => T[];
export function union<T>(
  arrayOrOther: T[] | T[],
  other?: T[]
): T[] | ((array: T[]) => T[]) {
  return arguments.length === 1
    ? (array: T[]) => union(array, arrayOrOther as T[])
    : [...new Set([...arrayOrOther, ...other!])];
}

/**
 * Returns a new array with all duplicate elements removed.
 *
 * @param array - The array to operate on
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3, 4, 5, 1, 2, 3, 4, 5], A.uniq);
 *
 * assertEquals(x, [1, 2, 3, 4, 5]);
 * ```
 */
export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Returns a new array of tuples, where the n-th tuple contains the corresponding element from each of the argument arrays.
 *
 * @param array - The array to operate on
 * @param other - The array to zip with
 *
 * @example
 * ```
 * const x = pipe([1, 2, 3], A.zip(["a", "b", "c"]));
 *
 * assertEquals(x, [[1, "a"], [2, "b"], [3, "c"]]);
 * ```
 */
export function zip<T, U>(array: T[], other: U[]): readonly [T, U][];
export function zip<T, U>(other: U[]): (array: T[]) => readonly [T, U][];
export function zip<T, U>(
  arrayOrOther: T[] | U[],
  other?: U[]
): readonly [T, U][] | ((array: T[]) => readonly [T, U][]) {
  return arguments.length === 1
    ? (array: T[]) => zip(array, arrayOrOther as U[])
    : arrayOrOther.map((a, i) => [a as T, other![i]]);
}
