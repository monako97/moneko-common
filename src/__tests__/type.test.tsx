import {
  getType,
  isEqual,
  isFunction,
  isObject,
  isUndefined,
  isString,
  isSvgElement,
  arraysEqual,
  functionsEqual,
  deepClone,
} from "../type";

test("测试 getType", () => {
  expect('[object GeneratorFunction]').toBe(
    getType(
      {
        *names() {
          yield;
          return false;
        },
      }.names
    )
  );
});

test("测试 isFunction", () => {
  expect(false).toBe(isFunction(null));
  expect(false).toBe(isFunction({ a: 1 }));
  expect(true).toBe(isFunction(() => false));
});

test("测试 isString", () => {
  expect(false).toBe(isString({ a: 1 }));
  expect(true).toBe(isString("null"));
});

test("测试 isObject", () => {
  expect(false).toBe(isObject("s"));
  expect(true).toBe(isObject({ a: 1 }));
});

test("测试 isUndefined", () => {
  expect(false).toBe(isUndefined({ a: 1 }));
  expect(true).toBe(isUndefined(undefined));
});
test("测试 isSvgElement", () => {
  expect(false).toBe(isSvgElement({ a: 1 }));
});
test("测试 arraysEqual", () => {
  expect(false).toBe(arraysEqual([1], []));
  expect(true).toBe(arraysEqual([1, { a: "s" }], [1, { a: "s" }]));
  expect(false).toBe(arraysEqual([1, { a: "s" }], [1, { a: "b" }]));
});
test("测试 functionsEqual", () => {
  const a = (msg: string) => {
    console.log(msg);
  };
  const b = a;
  const c = (msg: string) => {
    console.log(msg);
  };
  function namea() {
    let a = 1;
  }
  function nameb() {
    let a = 1;
  }
  expect(true).toBe(functionsEqual(a, b));
  expect(true).toBe(functionsEqual(c, b));
  expect(false).toBe(functionsEqual(namea, nameb));
});

test("测试 isEqual", () => {
  expect(true).toBe(isEqual({ a: 1 }, { a: 1 }));
  expect(false).toBe(isEqual({ a: 1 }, { a: 2, c: 1 }));
  expect(false).toBe(isEqual({ a: 1 }, 2));
  expect(true).toBe(isEqual([{ a: 1 }], [{ a: 1 }]));
  expect(true).toBe(
    isEqual(
      {
        a: () => {
          console.log("a");
        },
      },
      {
        a: () => {
          console.log("a");
        },
      }
    )
  );
});

test("测试 deepClone", () => {
  const obj = {
    a: 2
  }
  const newObj = deepClone(obj);

  obj.a = 3;
  expect(obj.a).toBe(3);
  expect(newObj.a).toBe(2);
});

