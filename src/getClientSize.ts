export interface ClientSize {
  width: number;
  height: number;
}

/**
 * 获取可视区域大小
 * @return {ClientSize} clientWidth and clientHeight
 */
function getClientSize(): ClientSize {
  if (window.innerWidth !== null) {
    // ie9 +  最新浏览器
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  if (document.compatMode === 'CSS1Compat') {
    // 标准浏览器
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }
  // 怪异浏览器
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };
}

export default getClientSize;
