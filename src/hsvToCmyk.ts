import { type CMYK, type HSVA, type MaxNum, maxNum } from './colorParse';
import { hsvToRgb } from './hsvToRgb';

/**
 * 将 HSV 光谱转换为 CMYK
 * @param {HSVA} hsva 色
 * @returns {CMYK} CMYK values
 */
export function hsvToCmyk(hsva: HSVA): CMYK & { max: MaxNum['cmyk'] } {
  const [h, s, v, a = 1] = hsva;
  const rgb = hsvToRgb([h, s, v, a]);
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
  const cmyk = [
    Math.floor(c * 100),
    Math.floor(m * 100),
    Math.floor(y * 100),
    Math.floor(k * 100),
  ] as CMYK & { max: MaxNum['cmyk'] };

  cmyk.toString = () => `cmyk(${cmyk.join('%, ')})`;
  cmyk.max = maxNum.cmyk;
  return cmyk;
}
