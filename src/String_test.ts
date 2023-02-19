import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as S from "./String.ts";
import * as O from "./Option.ts";
import * as A from "./Array.ts";
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

Deno.test("String - charAt", () => {
  const x = pipe("Hello World!", S.charAt(0), O.unwrapOr("Not Found"));
  const y = pipe("Hello World!", S.charAt(12), O.unwrapOr("Not Found"));

  assertEquals(x, "H");
  assertEquals(y, "Not Found");
});

Deno.test("String - head", () => {
  const x = pipe("Hello World!", S.head, O.unwrapOr("Not Found"));
  const y = pipe("", S.head, O.unwrapOr("Not Found"));

  assertEquals(x, "H");
  assertEquals(y, "Not Found");
});

Deno.test("String - inclues", () => {
  const x = pipe("Hello World!", S.includes("Hello"));
  const y = pipe("Hello World!", S.includes("Goodbye"));

  assertEquals(x, true);
  assertEquals(y, false);
});

Deno.test("String - isEmpty", () => {
  const x = pipe("Hello World!", S.isEmpty);
  const y = pipe("", S.isEmpty);

  assertEquals(x, false);
  assertEquals(y, true);
});

Deno.test("String - isNonEmpty", () => {
  const x = pipe("Hello World!", S.isNonEmpty);
  const y = pipe("", S.isNonEmpty);

  assertEquals(x, true);
  assertEquals(y, false);
});

Deno.test("String - last", () => {
  const x = pipe("Hello World!", S.last, O.unwrapOr("Not Found"));
  const y = pipe("", S.last, O.unwrapOr("Not Found"));

  assertEquals(x, "!");
  assertEquals(y, "Not Found");
});

Deno.test("String - length", () => {
  const x = pipe("Hello World!", S.length);

  assertEquals(x, 12);
});

Deno.test("String - prepend", () => {
  const x = "Hello";
  const y = "World";

  const z = pipe(x, S.prepend(" "), S.prepend(y), S.prepend("!"));

  assertEquals(S.prepend(x, y), "WorldHello");
  assertEquals(z, "!World Hello");
});

Deno.test("String - remove", () => {
  const x = pipe("Hello World!", S.remove("Hello"));
  const y = pipe("Hello World!", S.remove("Goodbye"));
  const z = pipe("Hello Bonjour Hello", S.remove("Hello"));

  assertEquals(x, " World!");
  assertEquals(y, "Hello World!");
  assertEquals(z, " Bonjour Hello");
});

Deno.test("String - removeAll", () => {
  const x = pipe("Hello World!", S.removeAll("Hello"));
  const y = pipe("Hello World!", S.removeAll("Goodbye"));
  const z = pipe("Hello Bonjour Hello", S.removeAll("Hello"));

  assertEquals(x, " World!");
  assertEquals(y, "Hello World!");
  assertEquals(z, " Bonjour ");
});

Deno.test("String - replace", () => {
  const x = pipe("Hello World!", S.replace("Hello", "Goodbye"));
  const y = pipe("Hello World!", S.replace("Goodbye", "Hello"));

  assertEquals(x, "Goodbye World!");
  assertEquals(y, "Hello World!");
});

Deno.test("String - replaceAll", () => {
  const x = pipe("Hello World!", S.replaceAll("Hello", "Goodbye"));
  const y = pipe("Hello World!", S.replaceAll("Goodbye", "Hello"));
  const z = pipe("Hello Bonjour Hello", S.replaceAll("Hello", "Goodbye"));

  assertEquals(x, "Goodbye World!");
  assertEquals(y, "Hello World!");
  assertEquals(z, "Goodbye Bonjour Goodbye");
});

Deno.test("String - reverse", () => {
  const x = pipe("Hello World!", S.reverse);

  assertEquals(x, "!dlroW olleH");
});

Deno.test("String - split", () => {
  const x = pipe("Hello World!", S.split(" "));
  const y = pipe("Hello World!", S.split("o"));

  assertEquals(x, ["Hello", "World!"]);
  assertEquals(y, ["Hell", " W", "rld!"]);
});

Deno.test("String - splitAt", () => {
  const x = pipe("Hello World!", S.splitAt(5));
  const y = pipe("Hello World!", S.splitAt(12));
  const z = pipe("Hello World!", S.splitAt(0));

  assertEquals(x, ["Hello", " World!"]);
  assertEquals(y, ["Hello World!", ""]);
  assertEquals(z, ["", "Hello World!"]);
});

Deno.test("String - startsWith", () => {
  const x = pipe("Hello World!", S.startsWith("Hello"));
  const y = pipe("Hello World!", S.startsWith("Goodbye"));

  assertEquals(x, true);
  assertEquals(y, false);
});

Deno.test("String - trim, trimEnd, trimStart", () => {
  const str = " Hello World! ";
  const x = pipe(str, S.trim);
  const y = pipe(str, S.trimEnd);
  const z = pipe(str, S.trimStart);

  assertEquals(str, " Hello World! ");
  assertEquals(x, "Hello World!");
  assertEquals(y, " Hello World!");
  assertEquals(z, "Hello World! ");
});

Deno.test("String - toArray", () => {
  const x = pipe("Hello World!", S.toArray, A.uniq);
  const y = pipe("", S.toArray);

  assertEquals(x, ["H", "e", "l", "o", " ", "W", "r", "d", "!"]);
  assertEquals(y, []);
});

Deno.test("String - toLower, toUpper", () => {
  const str = "Hello World!";

  const x = pipe(str, S.toLower);
  const y = pipe(str, S.toUpper);

  assertEquals(str, "Hello World!");
  assertEquals(x, "hello world!");
  assertEquals(y, "HELLO WORLD!");
});

Deno.test("String - words", () => {
  const str = "Hello World!";

  const x = pipe(str, S.words);
  const y = pipe("", S.words);

  assertEquals(str, "Hello World!");
  assertEquals(x, ["Hello", "World!"]);
  assertEquals(y, []);
});

Deno.test("String - lines", () => {
  const str = "Hello\nWorld!\nnice hahahha\r\nlollllllllll";

  const x = pipe(str, S.lines);
  const y = pipe("", S.lines);

  assertEquals(str, "Hello\nWorld!\nnice hahahha\r\nlollllllllll");
  assertEquals(x, ["Hello", "World!", "nice hahahha", "lollllllllll"]);
  assertEquals(y, []);
});

Deno.test("String - deburr", () => {
  const str = "déjà vu";

  const x = pipe(str, S.deburr);

  assertEquals(str, "déjà vu");
  assertEquals(x, "deja vu");
});
