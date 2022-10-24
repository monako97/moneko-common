/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 获取 JavaScript 对象的类型
 * @param {*} target 检查的对象
 * @returns {String} 这个对象的类型
 */
export function getType(target: any): string {
  return Object.prototype.toString.call(target);
}
export function isObject(target: any): target is object {
  const type = typeof target;

  return target !== null && (type == 'object' || type == 'function');
}

export function isUndefined(target: any): target is undefined {
  return 'undefined' === typeof target;
}

export function isString(target: any): target is string {
  return 'string' === typeof target && getType(target) == '[object String]';
}

export function isSvgElement(target: any): target is SVGAElement {
  const tagType = getType(target);

  return '[object SVGSVGElement]' === tagType || '[object SVGPathElement]' === tagType;
}
const functionType = [
  '[object Function]',
  '[object AsyncFunction]',
  '[object GeneratorFunction]',
  '[object Proxy]',
];

// eslint-disable-next-line no-unused-vars
export function isFunction(target: any): target is (...args: any[]) => any {
  if (!isObject(target)) return false;
  const tagType = getType(target);

  return functionType.includes(tagType);
}
/**
 * 检查函数是否相等
 * @param {Array<any>} fun1 第一个数组
 * @param {Array<any>} fun2 第二个数组
 * @return {Boolean} 如果它们的值相等,则返回true
 */
export function functionsEqual(fun1: any, fun2: any): boolean {
  return fun1.toString() === fun2.toString();
}

/**
 * 检查两个对象或数组是否相等
 * @param {*} obj1 第一个对象
 * @param {*} obj2 第二个对象
 * @return {Boolean} 如果它们的值相等,则返回true
 */
export function isEqual(obj1: any, obj2: any): boolean {
  /**
   * 检查数组是否相等
   * @param {Array<any>} arr1 第一个数组
   * @param {Array<any>} arr2 第二个数组
   * @return {Boolean} 如果它们的值相等,则返回true
   */
  function arraysEqual(arr1: any[], arr2: any[]): boolean {
    // 检查长度
    if (arr1.length !== arr2.length) return false;
    // 检查数组中的每一项
    for (let i = 0, len = arr1.length; i < len; i++) {
      if (!isEqual(arr1[i], arr2[i])) return false;
    }
    return true;
  }
  function objectsEqual(val1: any, val2: any): boolean {
    if (Object.keys(val1).length !== Object.keys(val2).length) return false;
    // 检查对象中的每个项目
    for (const key in val1) {
      if (Object.prototype.hasOwnProperty.call(val1, key)) {
        if (!isEqual(val1[key], val2[key])) return false;
      }
    }
    return true;
  }
  // 获取对象类型
  const type = getType(obj1);

  // 如果两个项目不是同一类型，则返回 false
  if (type !== getType(obj2)) return false;
  // 根据类型比较
  if (type === '[object Array]') {
    return arraysEqual(obj1, obj2);
  } else if (type === '[object Object]') {
    return objectsEqual(obj1, obj2);
  } else if (functionType.includes(type)) {
    return functionsEqual(obj1, obj2);
  }
  return obj1 === obj2;
}

export function cloneDeep<T>(
  value: T,
  transfer?: {
    transfer: ReadonlyArray<import('worker_threads').TransferListItem>;
  }
) {
  return structuredClone(value, transfer);
}
