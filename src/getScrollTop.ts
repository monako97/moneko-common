import isUndefined from './isUndefined';

/**
 * 获取滚动条距离顶端的距离
 * @param {HTMLElement} ele HTMLElement
 * @return {Number} scrollTop
 */
function getScrollTop(ele?: HTMLElement): number {
  return (
    ele?.scrollTop ??
    // eslint-disable-next-line prettier/prettier
    (isUndefined(window) ? 0 : !isUndefined(window.pageYOffset) ? window.pageYOffset : document.compatMode === 'CSS1Compat' ? document.documentElement.scrollTop : document.body.scrollTop)
  );
}
export default getScrollTop;
