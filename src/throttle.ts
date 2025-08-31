/** 节流选项 */
export type ThrottleOptions = {
  /** 是否在开始时执行回调函数 */
  leading?: boolean;
  /** 是否在结束时执行回调函数 */
  trailing?: boolean;
};

/** 返回一个函数，该函数在固定时间内只执行一次
 * @template T
 * @param {T} fn - 需要执行的函数
 * @param {number} wait - 等待时间，单位为毫秒
 * @param {ThrottleOptions} [options] - 节流选项
 * @returns {T} 函数
 */

export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number,
  options: ThrottleOptions = {},
): T {
  let timeoutId: number | null = null;
  let previous = 0;
  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;

  function clear() {
    if (timeoutId) {
      cancelAnimationFrame(timeoutId);
      timeoutId = null;
    }
  }

  function throttled(...args: Parameters<T>) {
    const now = performance.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0) {
      clear();
      previous = now;
      if (leading) {
        fn(...args);
      } else if (trailing) {
        timeoutId = requestAnimationFrame(() => fn(...args));
      }
    } else if (trailing) {
      clear();
      timeoutId = requestAnimationFrame(() => throttled(...args));
    }
  }
  return throttled as T;
}
