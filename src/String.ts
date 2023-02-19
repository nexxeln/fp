import { none, Option, some } from "./Option.ts";

/**
 * Returns a string with the suffix appended at the end of the string.
 *
 * @param str - String to append to
 * @param suffix - String to append
 *
 * @example
 * ```
 * const x = pipe(
 *   "Hello",
 *   S.append(" "),
 *   S.append("World!"),
 * );
 *
 * assertEquals(x, "Hello World!");
 * ```
 */
export function append(str: string, suffix: string): string;
export function append(suffix: string): (str: string) => string;
export function append(
  strOrSuffix: string,
  suffix?: string
): string | ((str: string) => string) {
  if (arguments.length === 1) {
    return (_str: string) => append(_str, strOrSuffix);
  }

  return strOrSuffix + suffix;
}

/**
 * Returns true if the string ends with the given substring or false otherwise.
 *
 * @param str - String to check
 * @param substr - String to check if it is at the end of the string
 *
 * @example
 * ```
 * const x = pipe("Hello World!", S.endsWith("!"));
 * const y = pipe("Hello World!", S.endsWith("!!"));
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function endsWith(str: string, substr: string): boolean;
export function endsWith(substr: string): (str: string) => boolean;
export function endsWith(
  strOrSuffix: string,
  substr?: string
): boolean | ((str: string) => boolean) {
  if (arguments.length === 1) {
    return (_str: string) => endsWith(_str, strOrSuffix);
  }

  return strOrSuffix.endsWith(substr!);
}

/**
 * Returns an Option of Some type of the character at the given index or None if the index is out of bounds.
 *
 * @param str - String to check
 * @param n - Index of the character to return
 *
 * @example
 * ```
 * const x = pipe("hello", S.charAt(0), O.unwrapOr("nope"));
 * const y = pipe("hello", S.charAt(12), O.unwrapOr("nope"));
 *
 * assertEquals(x, "h");
 * assertEquals(y, "nope");
 * ```
 */
export function charAt(str: string, n: number): Option<string>;
export function charAt(n: number): (str: string) => Option<string>;
export function charAt(
  stringOrN: string | number,
  n?: number
): Option<string> | ((str: string) => Option<string>) {
  if (arguments.length === 1) {
    return (str: string) => charAt(str, stringOrN as number);
  }

  return n! >= 0 && n! < (stringOrN as string).length
    ? some((stringOrN as string).charAt(n!))
    : none;
}

/**
 * Returns an Option of Some type of the first character of the string or None if the string is empty.
 *
 * @param str - String to check
 *
 * @example
 * ```
 * const x = pipe("hello", S.head, O.unwrapOr("nope"));
 * const y = pipe("", S.head, O.unwrapOr("nope"));
 *
 * assertEquals(x, "h");
 * assertEquals(y, "nope");
 * ```
 */
export function head(str: string): Option<string> {
  return str === "" ? none : some(str[0]);
}

/**
 * Returns true if the string contains the given substring or false otherwise.
 *
 * @param str - String to check
 * @param substr - String to check if it is in the string
 *
 * @example
 * ```
 * const x = pipe("hello", S.includes("hell"));
 * const y = pipe("hello", S.includes("!"));
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function includes(str: string, substr: string): boolean;
export function includes(substr: string): (str: string) => boolean;
export function includes(
  strOrSuffix: string,
  substr?: string
): boolean | ((str: string) => boolean) {
  if (arguments.length === 1) {
    return (_str: string) => includes(_str, strOrSuffix);
  }

  return strOrSuffix.includes(substr!);
}
