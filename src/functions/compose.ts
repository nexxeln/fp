/**
 * Composes functions into one function from left to right.
 *
 * @example
 * ```
 * type Person = { name: string; age: number };
 *
 * const fn = compose(
 *   (p: Person) => ({ ...p, age: p.age + 1 }),
 *   (p) => ({ ...p, name: p.name.toUpperCase() })
 * );
 *
 *
 * const result = fn({ name: "John", age: 20 });
 *
 * assertEquals(result, { name: "JOHN", age: 21 });
 * ```
 */
export function compose<A extends ReadonlyArray<unknown>, B>(
  fn1: (...a: A) => B
): (...a: A) => B;
export function compose<A extends ReadonlyArray<unknown>, B, C>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C
): (...a: A) => C;
export function compose<A extends ReadonlyArray<unknown>, B, C, D>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D
): (...a: A) => D;
export function compose<A extends ReadonlyArray<unknown>, B, C, D, E>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E
): (...a: A) => E;
export function compose<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F
): (...a: A) => F;
export function compose<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G
): (...a: A) => G;
export function compose<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H
): (...a: A) => H;
export function compose<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I
>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H,
  fn8: (h: H) => I
): (...a: A) => I;
export function compose<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J
>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H,
  fn8: (h: H) => I,
  fn9: (i: I) => J
): (...a: A) => J;
export function compose<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K
>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H,
  fn8: (h: H) => I,
  fn9: (i: I) => J,
  fn10: (j: J) => K
): (...a: A) => K;
export function compose<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L
>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H,
  fn8: (h: H) => I,
  fn9: (i: I) => J,
  fn10: (j: J) => K,
  fn11: (k: K) => L
): (...a: A) => L;
export function compose<
  A extends ReadonlyArray<unknown>,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M
>(
  fn1: (...a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H,
  fn8: (h: H) => I,
  fn9: (i: I) => J,
  fn10: (j: J) => K,
  fn11: (k: K) => L,
  fn12: (k: L) => M
): (...a: A) => M;
// deno-lint-ignore ban-types
export function compose(fn1: Function, ...fns: Function[]) {
  if (fns.length === 0) {
    return fn1;
  }

  return (...args: unknown[]) =>
    fns.reduce((prev, fn) => fn(prev), fn1(...args));
}
