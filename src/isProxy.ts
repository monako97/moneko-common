import { getDataType } from './getDataType';

/**
 * 判断是否为 Proxy 对象
 * @param {unknown} obj obj
 * @returns {boolean} boolean
 */
export function isProxy(obj: unknown): boolean {
  return obj !== null && typeof obj === 'object' && getDataType(obj) === '[object Proxy]';
}
