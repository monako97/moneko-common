/**
 * 进入全屏
 * @constructor
 * @param {Element} e Element
 */
export function requestFullscreen(e: Element): void {
  (
    e.requestFullscreen ||
    e.mozRequestFullScreen ||
    e.msRequestFullscreen ||
    e.webkitRequestFullScreen
  )();
}
/**
 * 退出全屏
 * @constructor
 */
export function exitFullscreen(): void {
  (
    document.exitFullscreen ||
    document.mozCancelFullScreen ||
    document.msExitFullscreen ||
    document.webkitCancelFullScreen
  )();
}
/**
 * 是否全屏
 * @returns {boolean} boolean
 */
export function isFullscreen(): boolean {
  return (
    document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement
  );
}
/**
 * 切换全屏
 * @constructor
 * @param {Element} e Element
 */
export function toggleFullscreen(e: Element): void {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    requestFullscreen(e);
  }
}

export default {
  requestFullscreen,
  exitFullscreen,
  isFullscreen,
  toggleFullscreen,
};
