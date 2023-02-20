import { isFunction, isObject, isString } from "./Typeguards.ts";

export type Some<T> = { readonly type: "some"; readonly value: T };
export type None = { readonly type: "none" };

export type Option<T> = Some<T> | None;

/**
 * Checks if a value is an Option.
 *
 * @param value - The value to check
 *
 * @example
 * ```
 * const x = O.fromNullable(3);
 * const y = O.fromNullable(null);
 * const z = 3;
 *
 * assertEquals(O.isOption(x), true);
 * assertEquals(O.isOption(y), true);
 * assertEquals(O.isOption(z), false);
 * ```
 */
export function isOption<T>(value: unknown): value is Option<T> {
  return (
    isObject(value) &&
    typeof (value as { type?: string }).type === "string" &&
    ["some", "none"].includes((value as { type: string }).type)
  );
}

/**
 * Checks if an Option is of type Some.
 *
 * @param option - The Option to check
 *
 * @example
 * ```
 * const x = O.fromNullable(3);
 * const y = O.fromNullable(null);
 *
 * assertEquals(O.isSome(x), true);
 * assertEquals(O.isSome(y), false);
 * ```
 */
export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option.type === "some";

/**
 * Checks if an Option is of type None.
 *
 * @param option - The Option to check
 *
 * @example
 * ```
 * const x = O.fromNullable(3);
 * const y = O.fromNullable(null);
 *
 * assertEquals(O.isNone(x), false);
 * assertEquals(O.isNone(y), true);
 * ```
 */
export const isNone = <T>(option: Option<T>): option is None =>
  option.type === "none";

/**
 * Checks if an Option is of type None.
 *
 * @param value - The value to be converted to a Some type
 *
 * @example
 * ```
 * const someThree = O.some(3);
 * const someNull = O.some(null);
 * ```
 */
export const some = <T>(value: T): Option<T> => ({ type: "some", value });

/**
 * Constant to represent a value of None type.
 */
export const none: Option<never> = { type: "none" };

/**
 * Converts a value to an Option. If the value is null or undefined, it will be converted to a None type. Otherwise, it will be converted to a Some type.
 *
 * @param value - The value to be converted to an Option
 *
 *
 * @example
 * ```
 * const x = O.fromNullable(3);
 * const y = O.fromNullable(null);
 *
 * assertEquals(O.isSome(x), true);
 * assertEquals(O.isNone(y), true);
 * ```
 */
export const fromNullable = <T>(
  value: T | null | undefined
): Option<NonNullable<T>> =>
  value === null || value === undefined ? none : some(value as NonNullable<T>);

/**
 * Converts a value to an Option. If the value is falsy, it will be converted to a None type. Otherwise, it will be converted to a Some type.
 *
 * @param value - The value to be converted to an Option
 *
 * @example
 * ```
 * const x = O.fromFalsy(3);
 * const y = O.fromFalsy("");
 *
 * assertEquals(O.isSome(x), true);
 * assertEquals(O.isNone(y), true);
 * ```
 */
export const fromFalsy = <T>(value: T): Option<NonNullable<T>> =>
  value ? some(value as NonNullable<T>) : none;

/**
 * Returns a Some if the function does not throw an error. Otherwise, it returns a None. Direct replacement of try/catch.
 *
 * @param fn - The function to be executed
 *
 * @example
 * ```
 * const x = O.fromException(() => 3);
 * const y = O.fromException(() => { throw new Error("error lol") });
 *
 * assertEquals(O.isSome(x), true);
 * assertEquals(O.isNone(y), true);
 * ```
 */
export function fromException<T>(fn: () => T): Option<T> {
  try {
    return some(fn());
  } catch (_error) {
    return none;
  }
}

/**
 * Unwraps an Option, yielding the content of a Some. If the value is None, it will throw an error with the provided message.
 *
 * @param option - The option to be unwrapped
 * @param message - Error message if option is of None type
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable(3),
 *   O.expect("error lol")
 * ); // 3
 *
 * const y = pipe(
 *   O.fromNullable(null),
 *   O.expect("error lol")
 * ); // throws an Error with the provided message
 * ```
 */
export function expect<T>(option: Option<T>, message: string): T;
export function expect<T>(message: string): (option: Option<T>) => T;
export function expect<T>(
  optionOrMessage: Option<T> | string,
  message?: string
): T | ((option: Option<T>) => T) {
  if (isString(optionOrMessage)) {
    const message = optionOrMessage;

    return (option) => expect(option, message);
  } else {
    const option = optionOrMessage;

    if (isSome(option)) {
      return option.value;
    } else {
      throw new Error(message);
    }
  }
}

/**
 * Unwraps an Option, yielding the content of a Some. If the value is None, it will throw an error.
 *
 * @param option - The option to be unwrapped
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable(3),
 *   O.unwrap()
 * ); // 3
 *
 * const y = pipe(
 *   O.fromNullable(null),
 *   O.unwrap()
 * ); // throws an Error with the provided message
 * ```
 */
export function unwrap<T>(option: Option<T>): T;
export function unwrap<T>(): (option: Option<T>) => T;
export function unwrap<T>(option?: Option<T>): T | ((option: Option<T>) => T) {
  if (isOption(option)) {
    return expect(option, "Cannot unwrap a None value");
  } else {
    return (option) => unwrap(option);
  }
}

/**
 * Unwraps an Option, yielding the content of a Some. If the value is None, it will return the provided default value.
 *
 * @param option - The option to be unwrapped
 * @param defaultValue - The default value to be returned if the option is of None type
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable(null),
 *   O.unwrapOr(4)
 * );
 *
 * assertEquals(x, 4);
 * ```
 */
export function unwrapOr<T>(option: Option<T>, defaultValue: T): T;
export function unwrapOr<T>(defaultValue: T): (option: Option<T>) => T;
export function unwrapOr<T>(
  optionOrValue: Option<T> | T,
  defaultValue?: T
): T | ((option: Option<T>) => T) {
  if (isOption(optionOrValue)) {
    const option = optionOrValue;

    return isSome(option) ? option.value : defaultValue!;
  } else {
    const value = optionOrValue;

    return (option) => (isSome(option) ? option.value : value);
  }
}

/**
 * Unwraps an Option, yielding the content of a Some. If the value is None, it will return the result of calling the provided function.
 *
 * @param option - The option to be unwrapped
 * @param fn - The function to be called if the option is of None type
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable(null),
 *   O.unwrapOrElse(() => 4)
 * );
 *
 * assertEquals(x, 4);
 * ```
 */
export function unwrapOrElse<T>(option: Option<T>, fn: () => T): T;
export function unwrapOrElse<T>(fn: () => T): (option: Option<T>) => T;
export function unwrapOrElse<T>(
  optionOrFn: Option<T> | (() => T),
  fn?: () => T
): T | ((option: Option<T>) => T) {
  if (isFunction(optionOrFn)) {
    const fn = optionOrFn;

    return (option) => (isSome(option) ? option.value : fn());
  } else {
    const option = optionOrFn;

    return isSome(option) ? option.value : fn!();
  }
}

/**
 * Maps an Option by applying a function to a contained Some value, leaving a None value untouched.
 *
 * @param option - The option to be mapped
 * @param fn - The function to be applied to the contained value
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable(3),
 *   O.map((n) => n + 1),
 *   O.unwrapOr(0)
 * );
 *
 * const y = pipe(
 *   O.fromNullable(null),
 *   O.map((n) => n + 1)
 *   O.unwrapOr(0)
 * );
 *
 * assertEquals(x, 4);
 * assertEquals(y, 0);
 * ```
 */
export function map<T, U>(
  option: Option<T>,
  fn: (value: T) => NonNullable<U>
): Option<U>;
export function map<T, U>(
  fn: (value: T) => NonNullable<U>
): (option: Option<T>) => Option<U>;
export function map<T, U>(
  optionOrFn: Option<T> | ((value: T) => NonNullable<U>),
  fn?: (value: T) => NonNullable<U>
): Option<U> | ((option: Option<T>) => Option<U>) {
  if (isFunction(optionOrFn)) {
    const mapFn = optionOrFn;

    return (option) => map(option, mapFn);
  } else {
    const option = optionOrFn;

    if (isSome(option)) {
      return some(
        fn ? fn(option.value) : (option.value as unknown as NonNullable<U>)
      );
    } else {
      return none;
    }
  }
}

/**
 * Maps an Option by applying a function that returns an Option to a contained Some value, leaving the None value untouched.
 *
 * @param option - The option to be mapped
 * @param fn - The function to be applied to the contained value
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable("hi"),
 *   O.flatMap((s) => {
 *     return s.at(0) === "h" ? O.some("bye") : O.none
 *   }),
 *   O.unwrapOr("no")
 * );
 *
 * const y = pipe(
 *   O.fromNullable("hi"),
 *   O.flatMap((s) => {
 *     return s.at(0) === "a" ? O.some("bye") : O.none
 *   }),
 *   O.unwrapOr("no")
 * );
 *
 * assertEquals(x, "bye");
 * assertEquals(y, "no");
 * ```
 */
export function flatMap<T, U>(
  option: Option<T>,
  fn: (value: T) => Option<U>
): Option<U>;
export function flatMap<T, U>(
  fn: (value: T) => Option<U>
): (option: Option<T>) => Option<U>;
export function flatMap<T, U>(
  optionOrFn: Option<T> | ((value: T) => Option<U>),
  fn?: (value: T) => Option<U>
): Option<U> | ((option: Option<T>) => Option<U>) {
  if (isFunction(optionOrFn)) {
    const flatMapFn = optionOrFn;

    return (option) => flatMap(option, flatMapFn);
  } else {
    const option = optionOrFn;

    if (isSome(option)) {
      return fn ? fn(option.value) : (option.value as unknown as Option<U>);
    } else {
      return none;
    }
  }
}

/**
 * Allows for pattern matching on an Option value. If the value is Some, the first function will be called with the value. If the value is None, the second function will be called.
 *
 * @param option - The option to be matched
 * @param someFn - The function to be called if the option is of Some type
 * @param noneFn - The function to be called if the option is of None type
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable(3),
 *   O.match(
 *     (n) => n + 1,
 *     () => 0
 *   )
 * );
 *
 * assertEquals(x, 4);
 * ```
 */
export function match<T, U>(
  option: Option<T>,
  someFn: (value: T) => NonNullable<U>,
  noneFn: () => U
): U;
export function match<T, U>(
  someFn: (value: T) => NonNullable<U>,
  noneFn: () => U
): (option: Option<T>) => U;
export function match<T, U>(
  optionOrSomeFn: Option<T> | ((value: T) => NonNullable<U>),
  someFnOrNoneFn?: (value: T) => NonNullable<U> | (() => U),
  noneFn?: () => U
): U | ((option: Option<T>) => U) {
  if (isFunction(optionOrSomeFn)) {
    const someFn = optionOrSomeFn;
    const noneFn = someFnOrNoneFn as () => U;

    return (option) => match(option, someFn, noneFn);
  } else {
    const option = optionOrSomeFn;
    const someFn = someFnOrNoneFn as (value: T) => NonNullable<U>;

    if (isSome(option)) {
      return someFn(option.value);
    } else {
      return noneFn ? (noneFn() as U) : (none as unknown as U);
    }
  }
}

/**
 * Allows running a side effect on an Option if it is a Some type.
 *
 * @param option - The option to be tapped
 * @param fn - The function to be called if the option is of Some type
 *
 * @example
 * ```
 * let x = 0;
 * let y = 0;
 *
 * pipe(
 *   O.some(1),
 *   O.tap((n) => {
 *     x = n;
 *   })
 * );
 *
 * pipe(
 *   O.none,
 *   O.tap((n) => {
 *     y = n;
 *   })
 * );
 *
 * assertEquals(x, 1);
 * assertEquals(y, 0);
 * ```
 */
export function tap<T>(option: Option<T>, fn: (value: T) => void): Option<T>;
export function tap<T>(
  fn: (value: T) => void
): (option: Option<T>) => Option<T>;
export function tap<T>(
  optionOrFn: Option<T> | ((value: T) => void),
  fn?: (value: T) => void
): Option<T> | ((option: Option<T>) => Option<T>) {
  if (isFunction(optionOrFn)) {
    const tapFn = optionOrFn;

    return (option) => tap(option, tapFn);
  } else {
    const option = optionOrFn;

    if (isSome(option)) {
      fn ? fn(option.value) : option.value;
    }

    return option;
  }
}

/**
 * Combines two Options into a single Option of a tuple containing their values if they are a Some type.
 *
 * @param option - First option to be zipped
 * @param other - Second option to be zipped
 *
 * @example
 * ```
 * const x = pipe(
 *   O.fromNullable("hello"),
 *   O.zip(O.fromNullable("world")),
 *   O.expect("error")
 * );
 *
 * assertEquals(x, ["hello", "world"])
 * ```
 */
export function zip<T, U>(option: Option<T>, other: Option<U>): Option<[T, U]>;
export function zip<T, U>(
  other: Option<U>
): (option: Option<T>) => Option<[T, U]>;
export function zip<T, U>(
  optionOrOther: Option<T> | Option<U>,
  other?: Option<U>
): Option<[T, U]> | ((option: Option<T>) => Option<[T, U]>) {
  const zipOptions = (opt1: Option<T>, opt2: Option<U>): Option<[T, U]> => {
    if (isSome(opt1) && isSome(opt2)) {
      return some([opt1.value, opt2.value]);
    } else {
      return none;
    }
  };

  if (other === null || other === undefined) {
    return (option: Option<T>) =>
      zipOptions(option, optionOrOther as Option<U>);
  } else {
    return zipOptions(optionOrOther as Option<T>, other);
  }
}
