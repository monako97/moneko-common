import type { HEXA, RGBA } from './colorParse';

/** 将 RGB 值转换为十六进制颜色值
 * @param {RGBA} rgba rgba
 * @returns {HEXA} hex
 */
function rgbToHEX(rgba: RGBA): HEXA {
  const [r, g, b, a = 1] = rgba;
  const hex: HEXA = [
    Math.floor(r).toString(16).padStart(2, '0'),
    Math.floor(g).toString(16).padStart(2, '0'),
    Math.floor(b).toString(16).padStart(2, '0'),
    Math.floor(a * 255)
      .toString(16)
      .padStart(2, '0'),
  ];

  hex.toString = () => `#${a < 1 ? hex.join('') : hex.slice(0, 3).join('')}`;
  return hex;
}

export default rgbToHEX;
