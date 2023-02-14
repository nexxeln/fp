export type Some<T> = { readonly type: "some"; readonly value: T };
export type None = { readonly type: "none" };

export type Option<T> = Some<T> | None;

export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option.type === "some";

export const isNone = <T>(option: Option<T>): option is None =>
  option.type === "none";

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
