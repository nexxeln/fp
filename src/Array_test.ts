import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as A from "./Array.ts";
import * as O from "./Option.ts";
import { pipe } from "./Function.ts";

Deno.test("Array - all", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.all((n) => n > 0)
  );

  const y = A.all([1, 2, 3, 4, 5], (n) => n > 0);

  const z = pipe(
    ["hi", "hello", "howdy", "bye", "hey there"],
    A.all((str) => str.startsWith("h"))
  );

  assertEquals(x, true);
  assertEquals(y, true);
  assertEquals(z, false);
});

Deno.test("Array - any", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.any((n) => n < 0)
  );

  const y = A.any([1, 2, 3, 4, 5], (n) => n > 4);

  const z = pipe(
    ["hi", "hello", "howdy", "bye", "hey there"],
    A.any((str) => str.startsWith("h"))
  );

  assertEquals(x, false);
  assertEquals(y, true);
  assertEquals(z, true);
});

Deno.test("Array - append", () => {
  const x = pipe([1, 2, 3, 4, 5], A.append(6));

  const y = A.append([1, 2, 3, 4, 5], 6);

  const arr = [1, 2, 3, 4, 5];
  const z = A.append(arr, 6);

  assertEquals(x, [1, 2, 3, 4, 5, 6]);
  assertEquals(y, [1, 2, 3, 4, 5, 6]);
  assertEquals(arr, [1, 2, 3, 4, 5]);
  assertEquals(z, [1, 2, 3, 4, 5, 6]);
});

Deno.test("Array - at", () => {
  const x = pipe([1, 2, 3, 4, 5], A.at(2), O.unwrapOr(0));

  const y = pipe([1, 2, 3, 4, 5], A.at(6), O.unwrapOr(0));

  const z = pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    A.at(5),
    O.match(
      (n) => `yes ${n} is at index 5`,
      () => "nope not there"
    )
  );

  assertEquals(x, 3);
  assertEquals(y, 0);
  assertEquals(z, "yes 6 is at index 5");
});

Deno.test("Array - concat", () => {
  const x = pipe([1, 2, 3, 4, 5], A.concat([6, 7, 8, 9, 10]));

  const y = A.concat([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]);

  const z = pipe([6, 7, 8, 9, 10], A.concat([1, 2, 3, 4, 5]));

  assertEquals(x, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assertEquals(y, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assertEquals(z, [6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
});

Deno.test("Array - clone", () => {
  const x = A.clone([1, 2, 3, 4, 5]);

  assertEquals(x, [1, 2, 3, 4, 5]);
});

Deno.test("Array - diff", () => {
  const x = pipe([1, 2, 3, 4, 5], A.diff([1, 3, 5]));

  const y = A.diff([1, 2, 3, 4, 5], [1, 3, 5]);

  const z = pipe(
    [1, 2, 3, 4, 5],
    A.diff([1, 3, 5]),
    A.diff([2, 4]),
    A.at(0),
    O.unwrapOr(0)
  );

  const a = pipe([], A.diff([1, 3, 5]));

  const b = pipe([1, 3, 5], A.diff([2, 4, 6]));

  assertEquals(x, [2, 4]);
  assertEquals(y, [2, 4]);
  assertEquals(z, 0);
  assertEquals(a, []);
  assertEquals(b, [1, 3, 5]);
});

Deno.test("Array - drop", () => {
  const x = pipe([1, 2, 3, 4, 5], A.drop(2), O.unwrapOr([] as number[]));
  const y = pipe([1, 2, 3, 4, 5], A.drop(6), O.unwrapOr([] as number[]));
  const z = pipe([1, 2, 3, 4, 5], A.drop(-1), O.unwrapOr([] as number[]));

  assertEquals(x, [3, 4, 5]);
  assertEquals(y, []);
  assertEquals(z, []);
});

Deno.test("Array - find", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.find((n) => n > 3),
    O.unwrapOr(0)
  );

  const y = pipe(
    [1, 2, 3, 4, 5],
    A.find((n) => n < 0),
    O.unwrapOr(0)
  );

  assertEquals(x, 4);
  assertEquals(y, 0);
});

Deno.test("Array - findIndex", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.findIndex((n) => n > 3),
    O.unwrapOr(0)
  );

  const y = pipe(
    [1, 2, 3, 4, 5],
    A.findIndex((n) => n < 0),
    O.unwrapOr(100)
  );

  assertEquals(x, 3);
  assertEquals(y, 100);
});

Deno.test("Array - flatten", () => {
  const x = pipe(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    A.flatten,
    A.at(4),
    O.unwrapOr(0)
  );

  const y = pipe(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    A.flatten,
    A.at(10),
    O.unwrapOr(0)
  );

  const z = pipe([1, 2, [3, 4, [5, 6]], 7, 8], A.flatten);

  assertEquals(x, 5);
  assertEquals(y, 0);
  assertEquals(z, [1, 2, 3, 4, 5, 6, 7, 8]);
});

Deno.test("Array - head", () => {
  const x = pipe([1, 2, 3, 4, 5], A.head, O.unwrapOr(0));
  const y = pipe([], A.head, O.unwrapOr(0));

  assertEquals(x, 1);
  assertEquals(y, 0);
});

Deno.test("Array - intersection", () => {
  const x = pipe([1, 2, 3, 4, 5], A.intersection([1, 3, 5]));
  const y = A.intersection([2, 4, 6], [1, 3, 5]);
  const z = pipe([1, 2, 1, 1, 3], A.intersection([1]));
  const a = A.intersection([1, 2, 1, 1, 3], [1]);

  assertEquals(x, [1, 3, 5]);
  assertEquals(y, []);
  assertEquals(z, [1]);
  assertEquals(a, [1]);
});

Deno.test("Array - last", () => {
  const x = pipe([1, 2, 3, 4, 5], A.last, O.unwrapOr(0));
  const y = pipe([], A.last, O.unwrapOr(0));

  assertEquals(x, 5);
  assertEquals(y, 0);
});

Deno.test("Array - prepend", () => {
  const x = pipe([1, 2, 3, 4, 5], A.prepend(0));
  const y = A.prepend(0, [1, 2, 3, 4, 5]);
  const z = pipe([1, 2, 3, 4, 5], A.prepend(0), A.prepend(-1));

  assertEquals(x, [0, 1, 2, 3, 4, 5]);
  assertEquals(y, [0, 1, 2, 3, 4, 5]);
  assertEquals(z, [-1, 0, 1, 2, 3, 4, 5]);
});

Deno.test("Array - reject", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.reject((n) => n > 3)
  );

  const y = A.reject([1, 2, 3, 4, 5], (n) => n > 3);

  const z = pipe(
    [1, 2, 3, 4, 5],
    A.reject((n) => n < 0)
  );

  assertEquals(x, [1, 2, 3]);
  assertEquals(y, [1, 2, 3]);
  assertEquals(z, [1, 2, 3, 4, 5]);
});

Deno.test("Array - shuffle", () => {
  const x = pipe([1, 2, 3, 4, 5], A.shuffle);

  const y = A.shuffle([1, 2, 3, 4, 5]);

  assertEquals(x.length, 5);
  assertEquals(y.length, 5);
});

Deno.test("Array - tail", () => {
  const x = pipe([1, 2, 3, 4, 5], A.tail, O.unwrapOr([0]));
  const y = pipe([1], A.tail, O.unwrapOr([0]));
  const z = pipe([], A.tail, O.unwrapOr([0]));

  assertEquals(x, [2, 3, 4, 5]);
  assertEquals(y, []);
  assertEquals(z, [0]);
});
