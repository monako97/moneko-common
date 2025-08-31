import type { HSVA, MaxNum } from './colorParse';
import { rgbToHsv } from './rgbToHsv';

/**
 * 将 HEX 转换为 HSV
 * @param {number} hex RGB 颜色的十六进制字符串，长度可以是 3 或 6
 * @return {HSVA} HSV values.
 */
export function hexToHsv(hex: string): HSVA & { max: MaxNum['hsva'] } {
  let _hex = hex.replace(/^#/, '');

  if (hex.length === 4 || hex.length === 3) {
    _hex = hex
      .split('')
      .map((v) => v + v)
      .join('');
  }
  const [r = 0, g = 0, b = 0, a = 255] =
    _hex.match(/.{2}/g)?.map((v: string) => parseInt(v, 16)) || [];

  return rgbToHsv([r, g, b, Math.floor(Number((a / 2.55).toFixed(2))) / 100]);
}
