/**
 * 元素是否在内部
 * @param {Element} element 判断的元素
 * @param {Element} container 容器
 * @returns {boolean} true、false
 */
export default function isElementInside(element?: Element, container?: Element): boolean {
  if (!element || !container) {
    return false;
  }
  if (container.contains(element)) {
    return true;
  }
  const root = element.getRootNode();

  return root instanceof ShadowRoot ? isElementInside(root.host, container) : false;
}
