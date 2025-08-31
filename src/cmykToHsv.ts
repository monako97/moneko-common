import { type CMYK, type HSVA, type MaxNum, maxNum } from './colorParse';
import { hsvaToString } from './hsvaToString';
import { rgbToHsv } from './rgbToHsv';

/**
 * 将 CMYK 转换为 HSV
 * @param {CMYK} cmyk cmyk
 * @return {HSVA} HSV values.
 */
export function cmykToHsv(cmyk: CMYK): HSVA & { max: MaxNum['hsva'] } {
  const [c, m, y, k] = cmyk;
  const _c = c / 100,
    _m = m / 100,
    _y = y / 100,
    _k = k / 100;

  const r = (1 - Math.min(1, _c * (1 - _k) + _k)) * 255;
  const g = (1 - Math.min(1, _m * (1 - _k) + _k)) * 255;
  const b = (1 - Math.min(1, _y * (1 - _k) + _k)) * 255;
  const hsva = rgbToHsv([r, g, b, 1]);

  hsva.toString = () => hsvaToString(hsva);
  hsva.max = maxNum.hsva;
  return hsva;
}
