/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * @example
 * ```
 * type Person = { name: string; age: number };
 *
 * const result = pipe(
 *   { name: "John", age: 20}
 *   (p: Person) => ({ ...p, age: p.age + 1 }),
 *   (p) => ({ ...p, name: p.name.toUpperCase() })
 * );
 *
 * assertEquals(result, { name: "JOHN", age: 21 });
 * ```
 */
export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, fn1: (input: A) => B): B;
export function pipe<A, B, C>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C
): C;
export function pipe<A, B, C, D>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D
): D;
export function pipe<A, B, C, D, E>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E
): E;
export function pipe<A, B, C, D, E, F>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F
): F;
export function pipe<A, B, C, D, E, F, G>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G
): G;
export function pipe<A, B, C, D, E, F, G, H>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H
): H;
export function pipe<A, B, C, D, E, F, G, H, I>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I
): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J
): J;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K
): K;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L
): L;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L,
  fn12: (input: L) => M
): M;

// deno-lint-ignore ban-types
export function pipe(value: unknown, ...fns: Function[]): unknown {
  return fns.reduce((acc, fn) => fn(acc), value);
}
