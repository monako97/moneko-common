/**
 * 检查函数是否相等
 * @param {A} a 第一个数组
 * @param {B} b 第二个数组
 * @return {Boolean} 如果它们的值相等,则返回true
 */
function functionEqual<A extends VoidFunction, B extends VoidFunction>(a: A, b: B): boolean {
  return a.toString() === b.toString();
}
/**
 * 检查数组是否相等
 * @param {A1} one 第一个数组
 * @param {B1} arr2 第二个数组
 * @return {Boolean} 如果它们的值相等,则返回true
 */
function arrayEqual<A extends [], B extends []>(one: A, arr2: B): boolean {
  // 检查长度
  if (one.length !== arr2.length) {
    return false;
  }
  // 检查数组中的每一项
  for (let i = 0, len = one.length; i < len; i++) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!isEqual(one[i], arr2[i])) {
      return false;
    }
  }
  return true;
}

function objectEqual<A extends object, B extends object>(val1: A, val2: B): boolean {
  const keys = Object.keys(val1);

  if (keys.length !== Object.keys(val2).length) {
    return false;
  }
  // 检查对象中的每个项目
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i] as keyof A & keyof B;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!isEqual(val1[key], val2[key])) {
      return false;
    }
  }
  return true;
}

/**
 * 检查两个对象或数组是否相等
 * @param {*} obj1 第一个对象
 * @param {*} obj2 第二个对象
 * @return {Boolean} 如果它们的值相等,则返回true
 */
function isEqual<A, B>(obj1: A, obj2: B): boolean {
  // 获取对象类型
  const type = Object.prototype.toString.call(obj1);

  // 如果两个项目不是同一类型，则返回 false
  if (type !== Object.prototype.toString.call(obj2)) {
    return false;
  }
  // 根据类型比较
  if (type === '[object Array]') {
    return arrayEqual(obj1 as [], obj2 as []);
  } else if (type === '[object Object]') {
    return objectEqual(obj1 as object, obj2 as object);
  } else if (
    [
      '[object Function]',
      '[object AsyncFunction]',
      '[object GeneratorFunction]',
      '[object Proxy]',
    ].includes(type)
  ) {
    return functionEqual(obj1 as VoidFunction, obj2 as VoidFunction);
  }
  return (obj1 as string) === (obj2 as string);
}
export default isEqual;
