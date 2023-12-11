/**
 * 已60帧的目标刷新率进行函数操作, 只执行一次
 * @param {VoidFunction} call 回调函数
 * @constructor
 */
function frameCallback(call: VoidFunction) {
  let now = performance.now();

  function checkTime(timestamp: number) {
    const elapsed = timestamp - now;

    // 在渲染间隔小于 16.7 毫秒时进行计算
    if (elapsed < 16.7) {
      call();
    } else {
      now = timestamp;
      requestAnimationFrame(checkTime);
    }
  }

  requestAnimationFrame(checkTime);
}

export default frameCallback;
