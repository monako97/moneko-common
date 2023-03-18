import { type Func } from './isFunction';

/**
 * 检查函数是否相等
 * @param {A} a 第一个数组
 * @param {B} b 第二个数组
 * @return {Boolean} 如果它们的值相等,则返回true
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function functionEqual<A extends Func, B extends Func>(a: A, b: B): boolean {
  return a.toString() === b.toString();
}

export default functionEqual;
