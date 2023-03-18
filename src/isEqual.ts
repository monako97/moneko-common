import functionEqual from './functionEqual';
import functionType from './functionType';
import getDataType from './getDataType';
import { type Func } from './isFunction';

/**
 * 检查两个对象或数组是否相等
 * @param {*} obj1 第一个对象
 * @param {*} obj2 第二个对象
 * @return {Boolean} 如果它们的值相等,则返回true
 */
function isEqual<A, B>(obj1: A, obj2: B): boolean {
  /**
   * 检查数组是否相等
   * @param {A1} one 第一个数组
   * @param {B1} arr2 第二个数组
   * @return {Boolean} 如果它们的值相等,则返回true
   */
  function arraysEqual<A1 extends Array<A>, B1 extends Array<B>>(one: A1, arr2: B1): boolean {
    // 检查长度
    if (one.length !== arr2.length) {
      return false;
    }
    // 检查数组中的每一项
    for (let i = 0, len = one.length; i < len; i++) {
      if (!isEqual(one[i], arr2[i])) {
        return false;
      }
    }
    return true;
  }
  function objectsEqual<O1 extends object, O2 extends object>(val1: O1, val2: O2): boolean {
    if (Object.keys(val1).length !== Object.keys(val2).length) return false;
    // 检查对象中的每个项目
    for (const key in val1) {
      if (Object.prototype.hasOwnProperty.call(val1, key)) {
        if (!isEqual(val1[key], val2[key as unknown as keyof O2])) {
          return false;
        }
      }
    }
    return true;
  }
  // 获取对象类型
  const type = getDataType(obj1);

  // 如果两个项目不是同一类型，则返回 false
  if (type !== getDataType(obj2)) return false;

  // 根据类型比较
  if (type === '[object Array]') {
    return arraysEqual(obj1 as [], obj2 as []);
  } else if (type === '[object Object]') {
    return objectsEqual(obj1 as object, obj2 as object);
  } else if (functionType.includes(type)) {
    return functionEqual(obj1 as Func, obj2 as Func);
  }
  return (obj1 as string) === (obj2 as string);
}

export default isEqual;
