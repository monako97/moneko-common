/**
 * 获取最大 z-index
 * @returns {number} z-index
 */
export function getMaxZindex(): number {
  const el = document.getElementsByTagName('*');
  let max = +window.getComputedStyle(el[0]).zIndex || 0;

  for (let i = 1, len = el.length; i < len; i++) {
    const z = +window.getComputedStyle(el[i]).zIndex;

    if (z && z > max) {
      max = z;
    }
  }
  return max;
}
