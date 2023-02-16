import { isFunction, isObject, isString } from "./Typeguards.ts";

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

/**
 * Unwraps a Result of Ok type. If the Result is of Err type, throws an error with the error message.
 *
 * @param result - The Result to unwrap
 * @param message - The error message to throw if the Result is of Err type
 *
 * @example
 * ```
 * const x = pipe(
 *   R.fromNullable(3, "error"),
 *   R.expect("error")
 * ); // 3
 *
 * const y = pipe(
 *   R.fromNullable(null, "error"),
 *   R.expect("error message")
 * ); // throws error with message "error message"
 */
export function expect<T, E>(result: Result<T, E>, message: string): T;
export function expect<T, E>(message: string): (result: Result<T, E>) => T;
export function expect<T, E>(
  resultOrMessage: Result<T, E> | string,
  message?: string
): T | ((result: Result<T, E>) => T) {
  if (isString(resultOrMessage)) {
    const message = resultOrMessage;

    return (result) => expect(result, message);
  } else {
    const result = resultOrMessage;

    if (isOk(result)) {
      return result.value;
    } else {
      throw new Error(message);
    }
  }
}

/**
 * Unwraps a Result of Ok type. If the Result is of Err type, throws an error.
 *
 * @param result - The Result to unwrap
 *
 * @example
 * ```
 * const x = pipe(
 *   R.fromNullable(3, "error"),
 *   R.unwrap()
 * ); // 3
 *
 * const y = pipe(
 *   R.fromNullable(null, "error"),
 *   R.unwrap()
 * ); // throws error with message "Cannot unwrap Err value: error"
 * ```
 */
export function unwrap<T, E>(result: Result<T, E>): T;
export function unwrap<T, E>(): (result: Result<T, E>) => T;
export function unwrap<T, E>(
  result?: Result<T, E>
): T | ((result: Result<T, E>) => T) {
  if (result === null || result === undefined) {
    return (result: Result<T, E>) => unwrap(result);
  }

  if (isOk(result)) {
    return result.value;
  }

  throw new Error(`Cannot unwrap Err value: ${result.value}`);
}

/**
 * Unwraps a Result of Ok type. If the Result is of Err type, returns the default value.
 *
 * @param result - The Result to unwrap
 * @param defaultValue - The default value to return if the Result is of Err type
 *
 * @example
 * ```
 * const x = pipe(
 *   R.fromNullable(3, "error"),
 *   R.unwrapOr(0)
 * );
 *
 * const y = pipe(
 *   R.fromNullable(null, "error"),
 *   R.unwrapOr(0)
 * );
 *
 * assertEquals(x, 3);
 * assertEquals(y, 0);
 * ```
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T;
export function unwrapOr<T, E>(defaultValue: T): (result: Result<T, E>) => T;
export function unwrapOr<T, E>(
  resultOrDefaultValue: Result<T, E> | T,
  defaultValue?: T
): T | ((result: Result<T, E>) => T) {
  if (isResult(resultOrDefaultValue)) {
    const result = resultOrDefaultValue;

    return isOk(result) ? result.value : defaultValue!;
  } else {
    const defaultValue = resultOrDefaultValue;

    return (result) => (isOk(result) ? result.value : defaultValue);
  }
}

/**
 * Unwraps a Result of Ok type. If the Result is of Err type, calls the function to get the default value.
 *
 * @param result - The Result to unwrap
 * @param fn - The function to call if the Result is of Err type
 *
 * @example
 * ```
 * const x = pipe(
 *   R.fromNullable(3, "error"),
 *   R.unwrapOrElse(() => 0)
 * );
 *
 * const y = pipe(
 *   R.fromNullable(null, "error"),
 *   R.unwrapOrElse(() => 0)
 * );
 *
 * assertEquals(x, 3);
 * assertEquals(y, 0);
 * ```
 */
export function unwrapOrElse<T, E>(result: Result<T, E>, fn: () => T): T;
export function unwrapOrElse<T, E>(fn: () => T): (result: Result<T, E>) => T;
export function unwrapOrElse<T, E>(
  optionOrFn: Result<T, E> | (() => T),
  fn?: () => T
): T | ((result: Result<T, E>) => T) {
  if (isFunction(optionOrFn)) {
    const fn = optionOrFn;

    return (result) => (isOk(result) ? result.value : fn());
  } else {
    const result = optionOrFn;

    return isOk(result) ? result.value : fn!();
  }
}

/**
 * Maps a Result of Ok type. If the Result is of Err type, leaves it untouched.
 *
 * @param result - The Result to map over
 * @param fn - The function to map over the Result
 *
 * @example
 * ```
 * const x = pipe(
 *   R.fromNullable(3, "error"),
 *   R.map((x) => x + 1),
 *   R.unwrapOr(0)
 * );
 *
 * const y = pipe(
 *   R.fromNullable(null, "error"),
 *   R.map((x) => x + 1),
 *   R.unwrapOr(0)
 * );
 *
 * assertEquals(x, 4);
 * assertEquals(y, 0);
 * ```
 */
export function map<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E>;
export function map<T, E, U>(
  fn: (value: T) => U
): (result: Result<T, E>) => Result<U, E>;
export function map<T, E, U>(
  resultOrFn: Result<T, E> | ((value: T) => U),
  fn?: (value: T) => U
): Result<U, E> | ((result: Result<T, E>) => Result<U, E>) {
  if (isFunction(resultOrFn)) {
    const mapFn = resultOrFn;

    return (result) => map(result, mapFn);
  } else {
    const result = resultOrFn;

    return isOk(result) ? ok(fn!(result.value)) : result;
  }
}
