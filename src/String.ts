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

/**
 * Returns true if the string is empty or false otherwise.
 *
 * @param str - String to check
 *
 * @example
 * ```
 * const x = pipe("hello", S.isEmpty);
 * const y = pipe("", S.isEmpty);
 *
 * assertEquals(x, false);
 * assertEquals(y, true);
 * ```
 */
export function isEmpty(str: string): boolean {
  return str === "";
}

/**
 * Returns true if the string is not empty or false otherwise.
 *
 * @param str - String to check
 *
 * @example
 * ```
 * const x = pipe("hello", S.isNonEmpty);
 * const y = pipe("", S.isNonEmpty);
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function isNonEmpty(str: string): boolean {
  return str !== "";
}

/**
 * Returns an Option of Some type of the last character of the string or None if the string is empty.
 *
 * @param str - String to check
 *
 * @example
 * ```
 * const x = pipe("hello", S.last, O.unwrapOr("nope"));
 * const y = pipe("", S.last, O.unwrapOr("nope"));
 *
 * assertEquals(x, "o");
 * assertEquals(y, "nope");
 * ```
 */
export function last(str: string): Option<string> {
  return str === "" ? none : some(str[str.length - 1]);
}

/**
 * Returns the length of the string.
 *
 * @param str - String to check
 *
 * @example
 * ```
 * const x = pipe("hello", S.length);
 *
 * assertEquals(x, 5);
 * ```
 */
export function length(str: string): number {
  return str.length;
}

/**
 * Returns a new string with the prefix prepended to the beginning of the string.
 *
 * @param str - String to prepend to
 * @param prefix - String to prepend
 *
 * @example
 * ```
 * const x = pipe("hello", S.prepend("world"));
 *
 * assertEquals(x, "worldhello");
 * ```
 */
export function prepend(str: string, prefix: string): string;
export function prepend(prefix: string): (str: string) => string;
export function prepend(
  strOrPrefix: string,
  prefix?: string
): string | ((str: string) => string) {
  if (arguments.length === 1) {
    return (_str: string) => prepend(_str, strOrPrefix);
  }

  return prefix + strOrPrefix;
}

/**
 * Returns a new string with the first occurence of the substring removed from the string.
 *
 * @param str - String to remove the substring from
 * @param substr - String to remove
 *
 * @example
 * ```
 * const x = pipe("hello", S.remove("ell"));
 * const y = pipe("hello hi hello", S.remove("hello"));
 *
 * assertEquals(x, "ho");
 * assertEquals(y, " hi hello");
 * ```
 */
export function remove(str: string, substr: string): string;
export function remove(substr: string): (str: string) => string;
export function remove(
  strOrSuffix: string,
  substr?: string
): string | ((str: string) => string) {
  if (arguments.length === 1) {
    return (_str: string) => remove(_str, strOrSuffix);
  }

  return strOrSuffix.replace(substr!, "");
}

/**
 * removeAll
 * Returns a new string with all occurences of the substring removed from the string.
 *
 * @param str - String to remove the substring from
 * @param substr - String to remove
 *
 * @example
 * ```
 * const x = pipe("hello", S.removeAll("ell"));
 * const y = pipe("hello hi hello", S.removeAll("hello"));
 *
 * assertEquals(x, "ho");
 * assertEquals(y, " hi ");
 * ```
 */
export function removeAll(str: string, substr: string): string;
export function removeAll(substr: string): (str: string) => string;
export function removeAll(
  strOrSuffix: string,
  substr?: string
): string | ((str: string) => string) {
  if (arguments.length === 1) {
    return (_str: string) => removeAll(_str, strOrSuffix);
  }

  return strOrSuffix.replaceAll(substr!, "");
}

/**
 * Returns a new string with the first occurence of the substring replaced with the replacement string.
 *
 * @param str - String to replace the substring in
 * @param substr - String to replace
 * @param replacement - String to replace the substring with
 *
 * @example
 * ```
 * const x = pipe("hello", S.replace("ell", "ipp"));
 * const y = pipe("hello hi hello", S.replace("hello", "bye"));
 *
 * assertEquals(x, "hippo");
 * assertEquals(y, "bye hi hello");
 * ```
 */
export function replace(
  str: string,
  substr: string,
  replacement: string
): string;
export function replace(
  substr: string,
  replacement: string
): (str: string) => string;
export function replace(
  strOrSuffix: string,
  substrOrReplacement: string,
  replacement?: string
): string | ((str: string) => string) {
  if (arguments.length === 2) {
    return (_str: string) => replace(_str, strOrSuffix, substrOrReplacement);
  }

  return strOrSuffix.replace(substrOrReplacement, replacement!);
}

/**
 * Returns a new string with all occurences of the substring replaced with the replacement string.
 *
 * @param str - String to replace the substring in
 * @param substr - String to replace
 *
 * @example
 * ```
 * const x = pipe("hello", S.replaceAll("ell", "ipp"));
 * const y = pipe("hello hi hello", S.replaceAll("hello", "bye"));
 *
 * assertEquals(x, "hippo");
 * assertEquals(y, "bye hi bye");
 * ```
 */
export function replaceAll(
  str: string,
  substr: string,
  replacement: string
): string;
export function replaceAll(
  substr: string,
  replacement: string
): (str: string) => string;
export function replaceAll(
  strOrSuffix: string,
  substrOrReplacement: string,
  replacement?: string
): string | ((str: string) => string) {
  if (arguments.length === 2) {
    return (_str: string) => replaceAll(_str, strOrSuffix, substrOrReplacement);
  }

  return strOrSuffix.replaceAll(substrOrReplacement, replacement!);
}

/**
 * Returns a new string with it's characters reversed.
 *
 * @param str - String to reverse
 *
 * @example
 * ```
 * const x = pipe("hello", S.reverse);
 *
 * assertEquals(x, "olleh");
 * ```
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("");
}

/**
 * Returns an array of strings split at every occurence of the delimiter.
 *
 * @param str - String to split
 * @param delimiter - Delimiter to split the string at
 *
 * @example
 * ```
 * const x = pipe("hello world", S.split(" "));
 * const y = pipe("hello", S.split(""));
 *
 * assertEquals(x, ["hello", "world"]);
 * assertEquals(y, ["h", "e", "l", "l", "o"]);
 * ```
 */
export function split(str: string, delimiter: string): string[];
export function split(delimiter: string): (str: string) => string[];
export function split(
  strOrDelimiter: string,
  delimiter?: string
): string[] | ((str: string) => string[]) {
  if (arguments.length === 1) {
    return (_str: string) => split(_str, strOrDelimiter);
  }

  return strOrDelimiter.split(delimiter!);
}

/**
 * splitAt
 * Returns an array of two strings split at the index, the first string being the characters before the index and the second string being the characters at and after the index.
 *
 * @param str - String to split
 * @param index - Index to split the string at
 *
 * @example
 * ```
 * const x = pipe("hello", S.splitAt(2));
 * const y = pipe("hello", S.splitAt(0));
 *
 * assertEquals(x, ["he", "llo"]);
 * assertEquals(y, ["", "hello"]);
 * ```
 */
export function splitAt(str: string, index: number): [string, string];
export function splitAt(index: number): (str: string) => [string, string];
export function splitAt(
  strOrIndex: string | number,
  index?: number
): [string, string] | ((str: string) => [string, string]) {
  if (arguments.length === 1) {
    return (_str: string) => splitAt(_str, strOrIndex as number);
  }

  return [
    (strOrIndex as string).slice(0, index!),
    (strOrIndex as string).slice(index!),
  ];
}

/**
 * Returns true if the string starts with the prefix, false otherwise.
 *
 * @param str - String to check
 * @param prefix - Prefix to check the string starts with
 *
 * @example
 * ```
 * const x = pipe("hello", S.startsWith("he"));
 * const y = pipe("hello", S.startsWith("lo"));
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function startsWith(str: string, prefix: string): boolean;
export function startsWith(prefix: string): (str: string) => boolean;
export function startsWith(
  strOrPrefix: string,
  prefix?: string
): boolean | ((str: string) => boolean) {
  if (arguments.length === 1) {
    return (_str: string) => startsWith(_str, strOrPrefix);
  }

  return strOrPrefix.startsWith(prefix!);
}
