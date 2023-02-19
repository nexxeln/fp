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
  str: string,
  suffix?: string
): string | ((str: string) => string) {
  if (arguments.length === 1) {
    return (_str: string) => append(_str, str);
  }
  return str + suffix;
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
  str: string,
  substr?: string
): boolean | ((str: string) => boolean) {
  if (arguments.length === 1) {
    return (_str: string) => endsWith(_str, str);
  }
  return str.endsWith(substr!);
}
