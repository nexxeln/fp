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
