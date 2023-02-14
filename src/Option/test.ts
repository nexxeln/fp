import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as O from "./index.ts";
import { pipe } from "../pipe/index.ts";

Deno.test("Option: some", () => {
  const some = O.some(1);

  assertEquals(some, { type: "some", value: 1 });
});

Deno.test("Option: none", () => {
  const none = O.none;

  assertEquals(none, { type: "none" });
});

Deno.test("Option: isOption", () => {
  assertEquals(O.isOption(O.some(1)), true);
  assertEquals(O.isOption(O.none), true);
  assertEquals(O.isOption(1), false);
  assertEquals(O.isOption("1"), false);
  assertEquals(O.isOption(true), false);
  assertEquals(O.isOption(undefined), false);
});

Deno.test("Option: isSome", () => {
  assertEquals(O.isSome(O.some(1)), true);
  assertEquals(O.isSome(O.none), false);
});

Deno.test("Option: isNone", () => {
  assertEquals(O.isNone(O.some(1)), false);
  assertEquals(O.isNone(O.none), true);
});

Deno.test("Option: fromNullable", () => {
  assertEquals(O.fromNullable(1), O.some(1));
  assertEquals(O.fromNullable(null), O.none);
  assertEquals(O.fromNullable(undefined), O.none);
  assertEquals(O.fromNullable(false), O.some(false));
  assertEquals(O.fromNullable(""), O.some(""));
});

Deno.test("Option: fromFalsy", () => {
  assertEquals(O.fromFalsy(1), O.some(1));
  assertEquals(O.fromFalsy(null), O.none);
  assertEquals(O.fromFalsy(undefined), O.none);
  assertEquals(O.fromFalsy(false), O.none);
  assertEquals(O.fromFalsy(""), O.none);
});

Deno.test("Option: fromPromise", async () => {
  assertEquals(await O.fromPromise(Promise.resolve(1)), O.some(1));
  assertEquals(await O.fromPromise(Promise.reject(1)), O.none);
});

Deno.test("Option: expect", () => {
  assertEquals(O.expect(O.some(1), "error"), 1);
  assertEquals(O.expect("error")(O.some(1)), 1);
});

Deno.test("Option: unwrap", () => {
  assertEquals(O.unwrap(O.some(1)), 1);
});

Deno.test("Option: unwrapOr", () => {
  assertEquals(O.unwrapOr(O.some(1), 2), 1);
  assertEquals(O.unwrapOr(O.none, 2), 2);
});

Deno.test("Option: unwrapOrElse", () => {
  assertEquals(
    O.unwrapOrElse(O.some(1), () => 2),
    1
  );
  assertEquals(
    O.unwrapOrElse(O.none, () => 2),
    2
  );
});

Deno.test("Option: map", () => {
  assertEquals(
    pipe(
      O.some(1),
      O.map((x) => x + 1)
    ),
    O.some(2)
  );
  assertEquals(
    pipe(
      O.none,
      O.map((x) => x + 1)
    ),
    O.none
  );
});

Deno.test("Option: flatMap", () => {
  assertEquals(
    pipe(
      O.some(1),
      O.flatMap((x) => O.some(x + 1))
    ),
    O.some(2)
  );
  assertEquals(
    pipe(
      O.none,
      O.flatMap((x) => O.some(x + 1))
    ),
    O.none
  );
});

Deno.test("Option: match", () => {
  assertEquals(
    pipe(
      O.some(1),
      O.match(
        (x) => x + 1,
        () => 0
      )
    ),
    2
  );
  assertEquals(
    pipe(
      O.none,
      O.match(
        (x) => x + 1,
        () => 0
      )
    ),
    0
  );
});

Deno.test("Option: zip", () => {
  assertEquals(pipe(O.some(1), O.zip(O.none)), O.none);
  assertEquals(pipe(O.none, O.zip(O.some(1))), O.none);

  assertEquals(pipe(O.some(1), O.zip(O.some(2))), O.some([1, 2]));
});

Deno.test("Option - tap", () => {
  let x = 0;
  assertEquals(
    pipe(
      O.some(1),
      O.tap(() => {
        x = 1;
      })
    ),
    O.some(1)
  );

  assertEquals(x, 1);
});
