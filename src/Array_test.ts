import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as A from "./Array.ts";
import * as O from "./Option.ts";
import * as G from "./Typeguards.ts";
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

Deno.test("Array - take", () => {
  const x = pipe([1, 2, 3, 4, 5], A.take(3), O.unwrapOr([0]));
  const y = pipe([1, 2, 3, 4, 5], A.take(-1), O.unwrapOr([0]));
  const z = pipe([1, 2, 3, 4, 5], A.take(10), O.unwrapOr([0]));

  assertEquals(x, [1, 2, 3]);
  assertEquals(y, [0]);
  assertEquals(z, [1, 2, 3, 4, 5]);
});

Deno.test("Array - union", () => {
  const x = pipe([1, 2, 3, 4, 5], A.union([1, 3, 5]));
  const y = A.union([2, 4, 6], [1, 3, 5]);
  const z = pipe([1, 2, 1, 1, 3], A.union([1]));

  assertEquals(x, [1, 2, 3, 4, 5]);
  assertEquals(y, [2, 4, 6, 1, 3, 5]);
  assertEquals(z, [1, 2, 3]);
});

Deno.test("Array - uniq", () => {
  const x = pipe([1, 2, 3, 4, 5], A.uniq);
  const y = A.uniq([1, 1, 1, 1, 1, 1, 1, 1]);
  const z = pipe([1, 2, 1, 1, 3], A.uniq);

  assertEquals(x, [1, 2, 3, 4, 5]);
  assertEquals(y, [1]);
  assertEquals(z, [1, 2, 3]);
});

Deno.test("Array - sum", () => {
  const x = pipe([1, 2, 3, 4, 5], A.sum);
  const y = A.sum([1, 2, 3, 4, 5]);

  assertEquals(x, 15);
  assertEquals(y, 15);
});

Deno.test("Array - product", () => {
  const x = pipe([1, 2, 3, 4, 5], A.product);
  const y = A.product([1, 2, 3, 4, 5]);

  assertEquals(x, 120);
  assertEquals(y, 120);
});

Deno.test("Array - max", () => {
  const x = pipe([1, 2, 3, 4, 5], A.max, O.unwrapOr(0));
  const y = O.unwrapOr(A.max([]), 0);

  assertEquals(x, 5);
  assertEquals(y, 0);
});

Deno.test("Array - min", () => {
  const x = pipe([1, 2, 3, 4, 5], A.min, O.unwrapOr(0));
  const y = O.unwrapOr(A.min([]), 0);

  assertEquals(x, 1);
  assertEquals(y, 0);
});

Deno.test("Array - intersperse", () => {
  const x = pipe([1, 2, 3, 4, 5], A.intersperse(0));
  const y = A.intersperse([1, 2, 3, 4, 5], 0);

  assertEquals(x, [1, 0, 2, 0, 3, 0, 4, 0, 5]);
  assertEquals(y, [1, 0, 2, 0, 3, 0, 4, 0, 5]);
});

Deno.test("Array - map", () => {
  const arr = [1, 2, 3, 4, 5];

  const x = pipe(
    arr,
    A.map((n, i) => n * i)
  );

  const y = A.map([1, 2, 3, 4, 5], (n) => n + 1);

  const z = pipe(
    arr,
    A.map((n) => n * 2)
  );

  assertEquals(arr, [1, 2, 3, 4, 5]);
  assertEquals(x, [0, 2, 6, 12, 20]);
  assertEquals(y, [2, 3, 4, 5, 6]);
  assertEquals(z, [2, 4, 6, 8, 10]);
});

Deno.test("Array - length", () => {
  const x = pipe([1, 2, 3, 4, 5], A.length);
  const y = A.length([1, 2, 3, 4, 5]);

  assertEquals(x, 5);
  assertEquals(y, 5);
});

Deno.test("Array - filter", () => {
  const arr = [1, 2, 3, 4, 5];

  const x = pipe(
    arr,
    A.filter((n) => n % 2 === 0)
  );

  const y = A.filter(arr, (n) => n % 2 === 0);

  const z = pipe(
    arr,
    A.filter((_, i) => i % 2 === 0)
  );

  assertEquals(arr, [1, 2, 3, 4, 5]);
  assertEquals(x, [2, 4]);
  assertEquals(y, [2, 4]);
  assertEquals(z, [1, 3, 5]);
});

Deno.test("Array - sort", () => {
  const arr = [2, 4, 1, 3, 5];

  const x = pipe(
    arr,
    A.sort((a, b) => a - b)
  );

  const y = A.sort([1, 2, 3, 4, 5], (a, b) => b - a);

  const z = pipe(
    ["d", "a", "e", "b", "c"],
    A.sort((a, b) => a.localeCompare(b))
  );

  assertEquals(arr, [2, 4, 1, 3, 5]);
  assertEquals(x, [1, 2, 3, 4, 5]);
  assertEquals(y, [5, 4, 3, 2, 1]);
  assertEquals(z, ["a", "b", "c", "d", "e"]);
});

Deno.test("Array - partition", () => {
  const arr = [1, 2, 3, 4, 5];

  const x = pipe(
    arr,
    A.partition((n) => n % 2 === 0)
  );

  const y = A.partition(["a", 1, "b", 2, "c"], G.isNumber);

  const z = pipe(
    arr,
    A.partition((_, i) => i % 2 === 0)
  );

  assertEquals(arr, [1, 2, 3, 4, 5]);

  assertEquals(x, [
    [2, 4],
    [1, 3, 5],
  ]);

  assertEquals(y, [
    [1, 2],
    ["a", "b", "c"],
  ]);

  assertEquals(z, [
    [1, 3, 5],
    [2, 4],
  ]);
});

Deno.test("Array - reverse", () => {
  const x = pipe([1, 2, 3, 4, 5], A.reverse);
  const y = A.reverse([1, 2, 3, 4, 5]);

  assertEquals(x, [5, 4, 3, 2, 1]);
  assertEquals(y, [5, 4, 3, 2, 1]);
});

Deno.test("Array - reduce", () => {
  const arr = [1, 2, 3, 4, 5];
  const x = pipe(
    arr,
    A.reduce((acc, n) => acc + n, 0)
  );

  const y = A.reduce(arr, (acc, n) => acc + n, 0);

  const z = pipe(
    arr,
    A.reduce((acc, n, i) => acc + n + i, 0)
  );

  assertEquals(arr, [1, 2, 3, 4, 5]);
  assertEquals(x, 15);
  assertEquals(y, 15);
  assertEquals(z, 25);
});
