/**
 * 持久化对象，用于存储到本地存储中
 * @namespace
 */
export const persistence = {
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
    } catch {
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
    const type = typeof val;

    if (val === null || type === 'undefined') {
      persistence.remove(key);
      return;
    }
    const v: T | string = type === 'string' ? val : JSON.stringify(val);
    const old = localStorage.getItem(key);

    if (old === v) {
      return;
    }
    localStorage.setItem(key, v as string);
  },
  /**
   * 从本地存储中移除指定的键名
   * @param {string} key - 要移除的键名
   * @returns {void}
   */
  remove(key: string): void {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
    }
  },
};
