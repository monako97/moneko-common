/**
 * 监听页面的首屏 Largest Contentful Paint（LCP）事件
 * @param {Function}  call 回调函数，接收 LCP 时间（以毫秒为单位）作为参数
 * @returns {void}
 */
export function onLCP(call: (time: number) => void): void {
  const LCP = 'largest-contentful-paint';
  const observer = new PerformanceObserver(function (list) {
    const entries = list.getEntries();
    const lcpEntries = entries.filter((entry) => entry.entryType === LCP);

    if (lcpEntries.length > 0) {
      const firstScreenLCP = lcpEntries[0];
      const lcpTime = firstScreenLCP.renderTime || firstScreenLCP.loadTime;

      call(Math.round(lcpTime));
      observer.disconnect();
    }
  });

  observer.observe({ type: LCP, buffered: true });
}
