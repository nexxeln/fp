import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as O from "./Option.ts";
import { pipe } from "./Function.ts";

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

Deno.test("Option: fromException", () => {
  const throwIfNotOne = (x: number) => {
    if (x !== 1) {
      throw new Error("x is not 1");
    }

    return x;
  };

  const x = O.fromException(() => throwIfNotOne(1));
  const y = O.fromException(() => throwIfNotOne(2));

  assertEquals(O.isSome(x), true);
  assertEquals(O.isNone(y), true);
});

Deno.test("Option: expect", () => {
  assertEquals(O.expect(O.some(1), "error"), 1);
  assertEquals(O.expect("error")(O.some(1)), 1);
});

Deno.test("Option: unwrap", () => {
  assertEquals(pipe(O.some(1), O.unwrap()), 1);
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

  const x = pipe(
    O.fromNullable("hello"),
    O.zip(O.fromNullable("world")),
    O.expect("error")
  );

  assertEquals(x, ["hello", "world"]);
});
Deno.test("Option - tap", () => {
  let x = 0;
  pipe(
    O.some(1),
    O.tap(() => {
      x = 1;
    })
  );

  assertEquals(x, 1);

  let y = 0;
  pipe(
    O.none,
    O.tap(() => {
      y = 1;
    })
  );

  assertEquals(y, 0);
});
