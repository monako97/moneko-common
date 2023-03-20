import hsvToRgb from './hsvToRgb';
import rgbToHex from './rgbToHex';
import type { HEXA, HSVA } from './colorParse';

/**
 * 将 HSV 光谱转换为十六进制
 * @param {HSVA} hsva 色
 * @returns {HEXA} Hexa
 */
function hsvToHex(hsva: HSVA): HEXA {
  return rgbToHex(hsvToRgb(hsva));
}

export default hsvToHex;
