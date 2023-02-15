// deno-lint-ignore-file ban-types
export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isObject = (value: unknown): value is object =>
  typeof value === "object" && value !== null;

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;

export const isSymbol = (value: unknown): value is symbol =>
  typeof value === "symbol";

export const isBigInt = (value: unknown): value is bigint =>
  typeof value === "bigint";

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isRegExp = (value: unknown): value is RegExp =>
  value instanceof RegExp;

export const isPromise = (value: unknown): value is Promise<unknown> =>
  isObject(value) && isFunction((value as Promise<unknown>).then);

export const isGenerator = (value: unknown): value is Generator =>
  isObject(value) && isFunction((value as Generator).next);

export const isGeneratorFunction = (
  value: unknown
): value is GeneratorFunction =>
  isFunction(value) && value.constructor.name === "GeneratorFunction";

export const isIterable = (value: unknown): value is Iterable<unknown> =>
  isObject(value) && isFunction((value as Iterable<unknown>)[Symbol.iterator]);

export const isAsyncIterable = (
  value: unknown
): value is AsyncIterable<unknown> =>
  isObject(value) &&
  isFunction((value as AsyncIterable<unknown>)[Symbol.asyncIterator]);

export const isArray = <T>(value: unknown): value is T[] =>
  Array.isArray(value);

export const isSet = <T>(value: unknown): value is Set<T> =>
  value instanceof Set;

export const isMap = <K, V>(value: unknown): value is Map<K, V> =>
  value instanceof Map;
