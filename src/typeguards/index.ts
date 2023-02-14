// deno-lint-ignore-file ban-types
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";
