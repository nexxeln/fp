import { isFunction, isObject, isString } from "../typeguards/index.ts";

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

export const unwrap = <T>(option: Option<T>): T => {
  if (isNone(option)) {
    throw new Error("Expected a value but got none");
  }

  return option.value;
};

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
