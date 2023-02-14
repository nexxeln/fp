import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import { pipe } from "./pipe.ts";

// chatgpt wrote these tests because i cba to write them myself

Deno.test("pipe - single function", () => {
  const addOne = (num: number) => num + 1;

  const result = pipe(0, addOne);

  assertEquals(result, 1);
});

Deno.test("pipe - multiple functions", () => {
  const addOne = (num: number) => num + 1;
  const double = (num: number) => num * 2;

  const result = pipe(0, addOne, double);

  assertEquals(result, 2);
});

Deno.test("pipe - string manipulation", () => {
  const toUpperCase = (str: string) => str.toUpperCase();
  const addExclamation = (str: string) => `${str}!`;

  const result = pipe("hello", toUpperCase, addExclamation);

  assertEquals(result, "HELLO!");
});

Deno.test("pipe - array manipulation", () => {
  const addOne = (num: number) => num + 1;
  const double = (num: number) => num * 2;

  const result = pipe(
    [0, 1, 2],
    (x) => x.map((i) => addOne(i)),
    (x) => x.map((i) => double(i))
  );

  assertEquals(result, [2, 4, 6]);
});

Deno.test("pipe - object manipulation", () => {
  type Person = { name: string; age: number };

  const result = pipe(
    { name: "John", age: 20 },
    (p: Person) => ({ ...p, age: p.age + 1 }),
    (p) => ({ ...p, name: p.name.toUpperCase() })
  );

  assertEquals(result, { name: "JOHN", age: 21 });
});

Deno.test("pipe - empty function list", () => {
  const result = pipe("hello");

  assertEquals(result, "hello");
});
