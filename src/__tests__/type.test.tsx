import {
  getType,
  isEqual,
  isFunction,
  isNull,
  isObject,
  isUndefined,
  objectTag,
  arrayTag,
  stringTag,
  numberTag,
  mapTag,
  setTag,
  boolTag,
  dateTag,
  symbolTag,
  errorTag,
  regexpTag,
  funcTag,
  asyncTag,
  genTag,
  isString,
  isSvgElement,
} from '../type';

test('测试 getType', () => {
  expect(objectTag).toBe(getType({ a: 1 }));
  expect(arrayTag).toBe(getType(Array([1, 2])));
  expect(stringTag).toBe(getType(''));
  expect(numberTag).toBe(getType(1));
  expect(mapTag).toBe(getType(new Map()));
  expect(setTag).toBe(getType(new Set()));
  expect(boolTag).toBe(getType(true));
  expect(dateTag).toBe(getType(new Date()));
  expect(symbolTag).toBe(getType(Symbol('')));
  expect(errorTag).toBe(getType(Error('')));
  expect(regexpTag).toBe(getType(RegExp('')));
  expect(funcTag).toBe(getType(() => false));
  expect(asyncTag).toBe(getType(async () => false));
  expect(genTag).toBe(
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

test('测试 isEqual', () => {
  expect(true).toBe(isEqual({ a: 1 }, { a: 1 }));
  expect(false).toBe(isEqual({ a: 1 }, { a: 2 }));
});

test('测试 isFunction', () => {
  expect(false).toBe(isFunction(null));
  expect(false).toBe(isFunction({ a: 1 }));
  expect(true).toBe(isFunction(() => false));
});

test('测试 isNull', () => {
  expect(false).toBe(isNull({ a: 1 }));
  expect(true).toBe(isNull(null));
});
test('测试 isString', () => {
  expect(false).toBe(isString({ a: 1 }));
  expect(true).toBe(isString('null'));
});

test('测试 isObject', () => {
  expect(false).toBe(isObject('s'));
  expect(true).toBe(isObject({ a: 1 }));
});

test('测试 isUndefined', () => {
  expect(false).toBe(isUndefined({ a: 1 }));
  expect(true).toBe(isUndefined(undefined));
});
test('测试 isSvgElement', () => {
  expect(false).toBe(isSvgElement({ a: 1 }));
});
