import hsvToRGB from './hsvToRGB';
import rgbToHEX from './rgbToHEX';
import type { HEXA, HSVA } from './colorParse';

/**
 * 将 HSV 光谱转换为十六进制
 * @param {HSVA} hsva 色
 * @returns {HEXA} Hexa
 */
function hsvToHEX(hsva: HSVA): HEXA {
  return rgbToHEX(hsvToRGB(hsva));
}

export default hsvToHEX;
