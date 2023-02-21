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
 * Returns the greatest common divisor of two numbers.
 *
 * @param a - The first number
 * @param b - The second number
 *
 * @example
 * ```
 * const x = N.gcd(2, 3);
 * const y = N.gcd(8, -12);
 *
 * assertEquals(x, 1);
 * assertEquals(y, 4);
 * ```
 */
export function gcd(a: number, b: number): number;
export function gcd(b: number): (a: number) => number;
export function gcd(a: number, b?: number): number | ((a: number) => number) {
  if (b === undefined) return (b: number) => gcd(a, b);

  if (b === 0) return a;

  return Math.abs(gcd(b, a % b));
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

/**
 * Returns the least common multiple of two numbers.
 *
 * @param a - The first number
 * @param b - The second number
 *
 * @example
 * ```
 * const x = N.lcm(2, 3);
 * const y = N.lcm(8, 12);
 *
 * assertEquals(x, 6);
 * assertEquals(y, 24);
 * ```
 */
export function lcm(a: number, b: number): number;
export function lcm(b: number): (a: number) => number;
export function lcm(a: number, b?: number): number | ((a: number) => number) {
  if (b === undefined) return (b: number) => lcm(a, b);

  return Math.abs(a * b) / gcd(a, b);
}
