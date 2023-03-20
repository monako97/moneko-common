import rgbToHSV from './rgbToHSV';
import type { HSVA } from './colorParse';

/**
 * 将 HEX 转换为 HSV
 * @param {number} hex RGB 颜色的十六进制字符串，长度可以是 3 或 6
 * @return {HSVA} HSV values.
 */
function hexToHSV(hex: string): HSVA {
  let _hex = hex.replace(/^#/, '');

  if (hex.length === 4 || hex.length === 3) {
    _hex = hex
      .split('')
      .map((v) => v + v)
      .join('');
  }
  const [r = 0, g = 0, b = 0, a = 255] =
    _hex.match(/.{2}/g)?.map((v: string) => parseInt(v, 16)) || [];

  return rgbToHSV([r, g, b, Math.floor(Number((a / 2.55).toFixed(2))) / 100]);
}
export default hexToHSV;
