export type Some<T> = { readonly type: "some"; readonly value: T };
export type None = { readonly type: "none" };

export type Option<T> = Some<T> | None;

// basic
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
