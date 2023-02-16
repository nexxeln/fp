import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { pipe } from "./Function.ts";

import * as R from "./Result.ts";

Deno.test("Result - ok", () => {
  const ok = R.ok(1);

  assertEquals(ok, { type: "ok", value: 1 });
});

Deno.test("Result - err", () => {
  const err = R.err("error");

  assertEquals(err, { type: "err", value: "error" });
});

Deno.test("Result - isResult", () => {
  assertEquals(R.isResult(R.ok(1)), true);
  assertEquals(R.isResult(R.err("error")), true);
  assertEquals(R.isResult(1), false);
  assertEquals(R.isResult("1"), false);
  assertEquals(R.isResult(true), false);
  assertEquals(R.isResult(undefined), false);
});

Deno.test("Result - isOk", () => {
  assertEquals(R.isOk(R.ok(1)), true);
  assertEquals(R.isOk(R.err("error")), false);
});

Deno.test("Result - isErr", () => {
  assertEquals(R.isErr(R.ok(1)), false);
  assertEquals(R.isErr(R.err("error")), true);
});

Deno.test("Result - fromNullable", () => {
  assertEquals(R.fromNullable(1, "error"), R.ok(1));
  assertEquals(R.fromNullable(null, "error"), R.err("error"));
  assertEquals(R.fromNullable(undefined, "error"), R.err("error"));
  assertEquals(R.fromNullable(false, "error"), R.ok(false));
  assertEquals(R.fromNullable("", "error"), R.ok(""));
});

Deno.test("Result - fromFalsy", () => {
  assertEquals(R.fromFalsy(1, "error"), R.ok(1));
  assertEquals(R.fromFalsy(null, "error"), R.err("error"));
  assertEquals(R.fromFalsy(undefined, "error"), R.err("error"));
  assertEquals(R.fromFalsy(false, "error"), R.err("error"));
  assertEquals(R.fromFalsy("", "error"), R.err("error"));
});

Deno.test("Result - expect", () => {
  const x = pipe(R.fromNullable(1, "error"), R.expect("error"));

  assertEquals(x, 1);
});

Deno.test("Result - unwrap", () => {
  const x = pipe(R.fromNullable(1, "error"), R.unwrap());

  assertEquals(x, 1);
});

Deno.test("Result - unwrapOr", () => {
  const x = pipe(R.fromNullable(1, "error"), R.unwrapOr(2));
  const y = pipe(R.fromNullable(null, "error"), R.unwrapOr(2));

  assertEquals(x, 1);
  assertEquals(y, 2);
});

Deno.test("Result - unwrapOrElse", () => {
  const x = pipe(
    R.fromNullable(1, "error"),
    R.unwrapOrElse(() => 2)
  );
  const y = pipe(
    R.fromNullable(null, "error"),
    R.unwrapOrElse(() => 2)
  );

  assertEquals(x, 1);
  assertEquals(y, 2);
});
