/**
 * 持久化对象，用于存储到本地存储中
 * @namespace
 */
const persistence = {
  /**
   * 从本地存储中加载数据
   * @param {string} key - 存储的键名
   * @param {T} defaultValue - 默认值
   * @returns {T} - 返回加载的数据
   * @template T
   */
  load<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);

      if (data === null) {
        return defaultValue;
      }
      if (typeof defaultValue === 'string') {
        return data as T;
      }
      return JSON.parse(data) as T;
    } catch (e) {
      return defaultValue;
    }
  },
  /**
   * 设置数据到本地存储中
   * @param {string} key - 存储的键名
   * @param {T} val - 存储的数据
   * @returns {void}
   * @template T
   */
  set<T>(key: string, val: T): void {
    let v: T | string = val;

    if (val === null || typeof val === 'undefined') {
      persistence.remove(key);
      return;
    }
    if (typeof val === 'object' && val !== null) {
      v = JSON.stringify(val);
    }
    localStorage.setItem(key, v as string);
  },
  /**
   * 从本地存储中移除指定的键名
   * @param {string} key - 要移除的键名
   * @returns {void}
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

export default persistence;
