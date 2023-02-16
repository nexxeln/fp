import { isObject } from "./Typeguards.ts";

export type Ok<T> = { type: "ok"; value: T };
export type Err<E> = { type: "err"; value: E };

export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Wraps a value in a Result of Ok type.
 *
 * @param value - The value to wrap in a Result of Ok type
 *
 * @example
 * ```
 * const result = R.ok(1);
 * ```
 */
export function ok<T, E>(value: T): Result<T, E> {
  return { type: "ok", value };
}

/**
 * Wraps a value in a Result of Err type.
 *
 * @param value - The value to wrap in a Result of Err type
 *
 * @example
 * ```
 * const result = R.err("error");
 * ```
 */
export function err<T, E>(value: E): Result<T, E> {
  return { type: "err", value };
}

/**
 * Checks if a value is a Result.
 *
 * @param value - The value to check
 *
 * @example
 * ```
 * assertEquals(R.isResult(R.ok(1)), true);
 * assertEquals(R.isResult(R.err("error")), true);
 * assertEquals(R.isResult(1), false);
 * ```
 */
export function isResult<T, E>(value: unknown): value is Result<T, E> {
  return (
    isObject(value) &&
    typeof (value as { type?: string }).type === "string" &&
    ["ok", "err"].includes((value as { type: string }).type)
  );
}

/**
 * Checks if a Result is of Ok type.
 *
 * @param result - The Result to check
 *
 * @example
 * ```
 * assertEquals(R.isOk(R.ok(1)), true);
 * assertEquals(R.isOk(R.err("error")), false);
 * ```
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.type === "ok";
}

/**
 * Checks if a Result is of Err type.
 *
 * @param result - The Result to check
 *
 * @example
 * ```
 * assertEquals(R.isErr(R.err("error")), true);
 * assertEquals(R.isErr(R.ok(1)), false);
 * ```
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.type === "err";
}

/**
 * Wraps a value in a Result of Ok type if the value is not null or undefined. Otherwise, wraps the error in a Result of Err type.
 *
 * @param value - The value to wrap in a Result of Ok type if the value is not null or undefined
 * @param error - The error to wrap in a Result of Err type if the value is null or undefined
 *
 * @example
 * ```
 * const ok = R.fromNullable(1, "error");
 * const err = R.fromNullable(null, "error");
 *
 * assertEquals(ok, R.ok(1));
 * assertEquals(err, R.err("error"));
 * ```
 */
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

/**
 * Wraps a value in a Result of Ok type if the value is truthy. Otherwise, wraps the error in a Result of Err type.
 *
 * @param value - The value to wrap in a Result of Ok type if the value is truthy
 * @param error - The error to wrap in a Result of Err type if the value is falsy
 *
 * @example
 * ```
 * const ok = R.fromFalsy("hiii", "error");
 * const err = R.fromFalsy("", "error");
 *
 * assertEquals(ok, R.ok("hiii"));
 * assertEquals(err, R.err("error"));
 * ```
 */
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
