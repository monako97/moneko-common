import getDataType from './getDataType';

/**
 * 判断是否为 Proxy 对象
 * @param {unknown} obj obj
 * @returns {boolean} boolean
 */
function isProxy(obj: unknown): boolean {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj.constructor.name === 'Proxy' || getDataType(obj) === '[object Proxy]')
  );
}

export default isProxy;
