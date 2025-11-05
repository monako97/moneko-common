/**
 * Promise 防抖（每个异步执行和对外界有赋值行为前都需要 signal.throwIfAborted()）
 * @description 用于防止多次调用函数导致重复执行，能够真正中断之前还未完成的异步操作
 * @param executor 需要执行的Promise函数，不希望 executor 添加一个额外的 signal，必须前后保持一致
 * @returns Promise函数
 * @example
 * const func = debouncePromise(async (signal, name, age) => {
 *   // 确保：每个异步执行和对外界有赋值行为前都需要 signal.throwIfAborted();
 *   signal.throwIfAborted();
 *   await new Promise((resolve) => resolve(`${name} 第一步完成`));
 *   // 确保：每个异步执行和对外界有赋值行为前都需要 signal.throwIfAborted();
 *   signal.throwIfAborted();
 *   return `${name} 的结果`;
 * });
 * func('任务1', 100);
 * func('任务2', 100);
 * func('任务3', 100);
 */
export function debouncePromise<T extends unknown[], R>(
  executor: (signal: AbortSignal, ...args: T) => Promise<R>,
): (...args: T) => Promise<R> {
  let currentController: AbortController | null = null;

  return (...args: T): Promise<R> => {
    if (currentController && !currentController.signal.aborted) {
      currentController.abort();
    }
    currentController = new AbortController();
    const signal = currentController.signal;

    // 如果能解析 executor 里每个执行步骤，并自动在每个步骤执行前都自动触发 signal.throwIfAborted(); 或许就能达成效果
    return executor(signal, ...args);
  };
}
