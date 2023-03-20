import hsvToRGB from './hsvToRGB';
import type { CMYK, HSVA } from './colorParse';

/**
 * 将 HSV 光谱转换为 CMYK
 * @param {HSVA} hsva 色
 * @returns {CMYK} CMYK values
 */
function hsvToCMYK(hsva: HSVA): CMYK {
  const [h, s, v, a = 1] = hsva;
  const rgb = hsvToRGB([h, s, v, a]);
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
  const cmyk: CMYK = [
    Math.floor(c * 100),
    Math.floor(m * 100),
    Math.floor(y * 100),
    Math.floor(k * 100),
  ];

  cmyk.toString = () => `cmyk(${cmyk.join('%, ')})`;
  return cmyk;
}

export default hsvToCMYK;
