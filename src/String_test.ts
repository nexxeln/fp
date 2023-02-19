import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as S from "./String.ts";
import { pipe } from "./Function.ts";

Deno.test("String - append", () => {
  const x = "Hello";
  const y = "World";

  const z = pipe(x, S.append(" "), S.append(y), S.append("!"));

  assertEquals(S.append(x, y), "HelloWorld");
  assertEquals(z, "Hello World!");
});

Deno.test("String - endsWith", () => {
  const x = pipe("Hello World!", S.endsWith("!"));
  const y = pipe("Hello World!", S.endsWith("!!"));

  assertEquals(x, true);
  assertEquals(y, false);
});
