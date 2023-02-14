// deno-lint-ignore-file ban-types
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isObject = (value: unknown): value is object =>
  typeof value === "object" && value !== null;
