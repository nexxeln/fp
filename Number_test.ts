import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { pipe } from "./functions/pipe.ts";

import * as N from "./Number.ts";

Deno.test("Number - even", () => {
  assertEquals(pipe(2, N.even), true);
  assertEquals(pipe(3, N.even), false);
});

Deno.test("Number - gcd", () => {
  const x = N.gcd(2, 3);
  const y = N.gcd(8)(12);
  const z = N.gcd(8)(-12);

  assertEquals(x, 1);
  assertEquals(y, 4);
  assertEquals(z, 4);
});

Deno.test("Number - odd", () => {
  assertEquals(pipe(2, N.odd), false);
  assertEquals(pipe(3, N.odd), true);
});
