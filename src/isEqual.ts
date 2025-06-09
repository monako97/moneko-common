import getDataType from './getDataType';
import isProxy from './isProxy';

/**
 * 获取 Proxy 的目标对象
 * @param {{ target: T | undefined }} obj obj
 * @returns {T} boolean
 */
function getProxyTarget<T>(obj: { target?: T }): T {
  return obj?.target || (obj as T);
}
/**
 * 获取 Proxy 的处理器
 * @param {{ handler: T | undefined }} obj obj
 * @returns {T} boolean
 */
function getProxyHandler<T>(obj: { handler?: T }): T {
  return obj?.handler || ({} as T);
}

function toStringEqual(value: unknown, other: unknown) {
  return (
    (value as Record<string, string>).toString() === (other as Record<string, string>).toString()
  );
}

/**
 * 检查两个对象是否相等
 * @param {*} value 第一个对象
 * @param {*} other 第二个对象
 * @return {Boolean} 如果它们的值相等,则返回true
 */
function isEqual(value: unknown, other: unknown, cache = new WeakMap()): boolean {
  // 使用栈模拟递归
  const stack: [unknown, unknown][] = [[value, other]];

  while (stack.length > 0) {
    const [val1, val2] = stack.pop()!;

    // 如果两个值严格相等，直接跳过
    if (val1 === val2) {
      continue;
    }
    // 处理 null 和 undefined 的情况
    if (!val1 || !val2) {
      if (val1 !== val2) return false;
      continue;
    }
    const type = getDataType(val1);

    if (type !== getDataType(val2)) {
      return false;
    }
    // 处理 NaN 的情况
    if (Number.isNaN(val1) && Number.isNaN(val2)) {
      continue;
    }
    if (
      ['[object Function]', '[object AsyncFunction]', '[object GeneratorFunction]'].includes(type)
    ) {
      if (!toStringEqual(val1, val2)) return false;
      continue;
    }
    // 处理基本数据类型的比较
    if (typeof val1 !== 'object' && typeof val2 !== 'object') {
      if (val1 !== val2) return false;
      continue;
    }
    // 处理 BigInt 类型的比较
    if (typeof val1 === 'bigint' && typeof val2 === 'bigint') {
      if (val1 !== val2) return false;
      continue;
    }
    // 检查是否已经比较过这两个对象
    if (cache.has(val1) && cache.get(val1) === val2) {
      continue;
    }
    // 将当前比较的对象对存入缓存（仅当值为对象时）
    cache.set(val1, val2);
    cache.set(val2, val1);
    // 处理 Date 类型的比较
    if (val1 instanceof Date && val2 instanceof Date) {
      if (val1.getTime() !== val2.getTime()) return false;
      continue;
    }
    // 处理 RegExp 类型的比较
    if (val1 instanceof RegExp && val2 instanceof RegExp) {
      if (!toStringEqual(val1, val2)) return false;
      continue;
    }
    // 处理 Map 类型的比较
    if (val1 instanceof Map && val2 instanceof Map) {
      if (val1.size !== val2.size) return false;
      for (const [key, val] of val1) {
        if (!val2.has(key) || !isEqual(val, val2.get(key), cache)) {
          return false;
        }
      }
      return true;
    }
    // 处理 Set 类型的比较
    if (val1 instanceof Set && val2 instanceof Set) {
      if (val1.size !== val2.size) return false;
      for (const item of val1) {
        let found = false;

        for (const otherItem of val2) {
          if (isEqual(item, otherItem, cache)) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    }
    // 处理 ArrayBuffer 类型的比较
    if (val1 instanceof ArrayBuffer && val2 instanceof ArrayBuffer) {
      if (val1.byteLength !== val2.byteLength) return false;
      const view1 = new DataView(val1);
      const view2 = new DataView(val2);

      for (let i = 0; i < val1.byteLength; i++) {
        if (view1.getUint8(i) !== view2.getUint8(i)) return false;
      }
      continue;
    }
    // 处理 TypedArray 类型的比较
    if (ArrayBuffer.isView(val1) && ArrayBuffer.isView(val2)) {
      if (val1.byteLength !== val2.byteLength) return false;
      const typedArray1 = new Uint8Array(val1.buffer);
      const typedArray2 = new Uint8Array(val2.buffer);

      for (let i = 0; i < typedArray1.length; i++) {
        if (typedArray1[i] !== typedArray2[i]) return false;
      }
      continue;
    }
    // 处理 DataView 类型的比较
    if (val1 instanceof DataView && val2 instanceof DataView) {
      if (val1.byteLength !== val2.byteLength) return false;
      for (let i = 0; i < val1.byteLength; i++) {
        if (val1.getUint8(i) !== val2.getUint8(i)) return false;
      }
      continue;
    }
    // 处理 Promise 类型的比较
    if (val1 instanceof Promise && val2 instanceof Promise) {
      if (val1 !== val2) return false; // Promise 是唯一的，无法比较状态
      continue;
    }
    // 处理 Function 类型的比较
    if (typeof val1 === 'function' && typeof val2 === 'function') {
      if (!toStringEqual(val1, val2)) return false;
      continue;
    }
    // 处理 Proxy 对象的比较
    if (isProxy(val1) || isProxy(val2)) {
      const target1 = getProxyTarget(val1);
      const target2 = getProxyTarget(val2);
      const handler1 = getProxyHandler(val1);
      const handler2 = getProxyHandler(val2);

      stack.push([target1, target2], [handler1, handler2]);
      continue;
    }
    // 处理普通对象和数组的比较
    const valueKeys = Reflect.ownKeys(val1);
    const otherKeys = Reflect.ownKeys(val2);

    if (valueKeys.length !== otherKeys.length) return false;
    for (const key of valueKeys) {
      const left = (val1 as Record<string, WeakKey>)[key as string];
      const right = (val2 as Record<string, WeakKey>)[key as string];

      if (!Object.prototype.hasOwnProperty.call(other, key) || !isEqual(left, right, cache)) {
        return false;
      }
    }
  }

  return true;
}

export default isEqual;
