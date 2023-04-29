import type { RGBA } from './colorParse';

/** 计算两个颜色直接的对比度
 * @param {RGBA} one 颜色1
 * @param {RGBA} two 颜色2
 * @returns {number} 对比度
 */
function getColorContrast(one: RGBA, two: RGBA): number {
  function getRelativeLuminance(rgba: RGBA): number {
    const sRGB = [rgba[0] / 255, rgba[1] / 255, rgba[2] / 255].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
  }
  // 计算颜色的相对亮度
  const luminance1 = getRelativeLuminance(one);
  const luminance2 = getRelativeLuminance(two);

  // 计算对比度
  return (
    // 确定哪种颜色较浅，哪种颜色较深
    ((luminance1 > luminance2 ? luminance1 : luminance2) + 0.05) /
    ((luminance1 > luminance2 ? luminance2 : luminance1) + 0.05)
  );
}

export default getColorContrast;
