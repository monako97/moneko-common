/**
 * 获取数据的类型
 * @param {T} target 检查的对象
 * @returns {String} 这个对象的类型
 */
function getDataType<T>(target: T): string {
  return Object.prototype.toString.call(target);
}

export default getDataType;
