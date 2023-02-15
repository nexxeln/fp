import { isObject } from "./Typeguards.ts";

type Ok<T> = { type: "ok"; value: T };
type Err<E> = { type: "err"; value: E };

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
