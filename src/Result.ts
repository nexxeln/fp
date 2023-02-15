import { isObject } from "./Typeguards.ts";

export type Ok<T> = { type: "ok"; value: T };
export type Err<E> = { type: "err"; value: E };

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T, E>(value: T): Result<T, E> {
  return { type: "ok", value };
}

export function err<T, E>(value: E): Result<T, E> {
  return { type: "err", value };
}

export function isResult<T, E>(value: unknown): value is Result<T, E> {
  return (
    isObject(value) &&
    typeof (value as { type?: string }).type === "string" &&
    ["ok", "err"].includes((value as { type: string }).type)
  );
}

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.type === "ok";
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.type === "err";
}

export function fromNullable<T, E>(
  value: T | null | undefined,
  error: NonNullable<E>
): Result<NonNullable<T>, E>;
export function fromNullable<T, E>(
  error: NonNullable<E>
): (value: T | null | undefined) => Result<NonNullable<T>, E>;
export function fromNullable<T, E>(
  valueOrError: T | null | undefined | NonNullable<E>,
  error?: NonNullable<E>
):
  | Result<NonNullable<T>, E>
  | ((value: T | null | undefined) => Result<NonNullable<T>, E>) {
  if (error === null || error === undefined) {
    return (value: T | null | undefined) =>
      fromNullable(value, valueOrError as NonNullable<E>);
  }

  if (valueOrError === null || valueOrError === undefined) {
    return err(error);
  }

  return ok(valueOrError as NonNullable<T>);
}

export function fromFalsy<T, E>(
  value: T,
  error: NonNullable<E>
): Result<NonNullable<T>, E>;
export function fromFalsy<T, E>(
  error: NonNullable<E>
): (value: T) => Result<NonNullable<T>, E>;
export function fromFalsy<T, E>(
  valueOrError: T | NonNullable<E>,
  error?: NonNullable<E>
): Result<NonNullable<T>, E> | ((value: T) => Result<NonNullable<T>, E>) {
  if (error === null || error === undefined) {
    return (value: T) => fromFalsy(value, valueOrError as NonNullable<E>);
  }

  if (!valueOrError) {
    return err(error);
  }

  return ok(valueOrError as NonNullable<T>);
}
