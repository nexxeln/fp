import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import { compose } from "./index.ts";

Deno.test("compose - single function", () => {
  const addOne = (n: number) => n + 1;

  const fn = compose(addOne);

  const result = fn(0);

  assertEquals(result, 1);
});

Deno.test("compose - multiple functions", () => {
  const addOne = (n: number) => n + 1;
  const addTwo = (n: number) => n + 2;
  const timesTen = (n: number) => n * 10;

  const fn = compose(addOne, addTwo, timesTen);

  const result = fn(1);

  assertEquals(result, 40);
});

Deno.test("compose - string manipulation", () => {
  const toUpperCase = (str: string) => str.toUpperCase();
  const addExclamation = (str: string) => `${str}!`;

  const fn = compose(toUpperCase, addExclamation);

  const result = fn("hello");

  assertEquals(result, "HELLO!");
});

Deno.test("compose - array manipulation", () => {
  const fn = compose(
    (arr: string[]) => arr.map((char) => char.toUpperCase()),
    (arr) => arr.map((char) => `${char}!`),
    (arr) => arr.join("")
  );

  const result = fn(["h", "e", "l", "l", "o"]);

  assertEquals(result, "H!E!L!L!O!");
});

Deno.test("compose - object manipulation", () => {
  type Person = { name: string; age: number };
  const fn = compose(
    (obj: Person) => ({ ...obj, age: obj.age + 1 }),
    (obj) => ({ ...obj, name: obj.name.toUpperCase() })
  );

  const result = fn({ name: "John", age: 20 });

  assertEquals(result, { name: "JOHN", age: 21 });
});
