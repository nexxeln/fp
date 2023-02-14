import { isFunction } from "../typeguards/index.ts";

export type Some<T> = { readonly type: "some"; readonly value: T };
export type None = { readonly type: "none" };

export type Option<T> = Some<T> | None;

// basic
export function isOption<T>(value: unknown): value is Option<T> {
  return (
    isObject(value) &&
    typeof (value as { type?: string }).type === "string" &&
    ["some", "none"].includes((value as { type: string }).type)
  );
}

export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option.type === "some";

export const isNone = <T>(option: Option<T>): option is None =>
  option.type === "none";

// constructors
export const some = <T>(value: T): Option<T> => ({ type: "some", value });

export const none: Option<never> = { type: "none" };

export const fromNullable = <T>(
  value: T | null | undefined
): Option<NonNullable<T>> =>
  value === null || value === undefined ? none : some(value as NonNullable<T>);

export const fromFalsy = <T>(value: T): Option<NonNullable<T>> =>
  value ? some(value as NonNullable<T>) : none;

export const fromFunction = <T>(fn: () => T): Option<NonNullable<T>> => {
  try {
    return some(fn() as NonNullable<T>);
  } catch {
    return none;
  }
};

export const fromPromise = async <T>(
  promise: Promise<T>
): Promise<Option<NonNullable<T>>> => {
  try {
    return some((await promise) as NonNullable<T>);
  } catch {
    return none;
  }
};

// destructors
export const expect = <T>(option: Option<T>, message: string): T => {
  if (isNone(option)) {
    throw new Error(message);
  }

  return option.value;
};

export const unwrap = <T>(option: Option<T>): T => {
  if (isNone(option)) {
    throw new Error("Expected a value but got none");
  }

  return option.value;
};

export const unwrapOr = <T>(option: Option<T>, defaultValue: T): T =>
  isNone(option) ? defaultValue : option.value;

export const unwrapOrElse = <T>(option: Option<T>, fn: () => T): T =>
  isNone(option) ? fn() : option.value;

// combinators
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
