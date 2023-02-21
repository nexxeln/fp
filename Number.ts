/**
 * Checks if a number is even.
 *
 * @param n - The number to check
 *
 * @example
 * ```
 * const x = pipe(2, N.even);
 * const y = pipe(3, N.even);
 *
 * assertEquals(x, true);
 * assertEquals(y, false);
 * ```
 */
export function even(n: number): boolean {
  return n % 2 === 0;
}

/**
 * Checks if a number is odd.
 *
 * @param n - The number to check
 *
 * @example
 * ```
 * const x = pipe(2, N.odd);
 * const y = pipe(3, N.odd);
 *
 * assertEquals(x, false);
 * assertEquals(y, true);
 * ```
 */
export function odd(n: number): boolean {
  return n % 2 !== 0;
}
