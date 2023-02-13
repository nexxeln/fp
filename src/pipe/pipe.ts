interface Pipe {
  <A>(value: A): A;
  <A, B>(value: A, fn1: (input: A) => B): B;
  <A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
  <A, B, C, D>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D
  ): D;
  <A, B, C, D, E>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E
  ): E;
  <A, B, C, D, E, F>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E,
    fn5: (input: E) => F
  ): F;
  <A, B, C, D, E, F, G>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E,
    fn5: (input: E) => F,
    fn6: (input: F) => G
  ): G;
  <A, B, C, D, E, F, G, H>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E,
    fn5: (input: E) => F,
    fn6: (input: F) => G,
    fn7: (input: G) => H
  ): H;
  <A, B, C, D, E, F, G, H, I>(
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
  <A, B, C, D, E, F, G, H, I, J>(
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
  <A, B, C, D, E, F, G, H, I, J, K>(
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
  <A, B, C, D, E, F, G, H, I, J, K, L>(
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
  <A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
}

// deno-lint-ignore ban-types
export const pipe: Pipe = (value: unknown, ...fns: Function[]): unknown => {
  return fns.reduce((acc, fn) => fn(acc), value);
};
