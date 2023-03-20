import hsvaToString from './hsvaToString';
import rgbToHSV from './rgbToHsv';
import type { CMYK, HSVA } from './colorParse';

/**
 * 将 CMYK 转换为 HSV
 * @param {CMYK} cmyk cmyk
 * @return {HSVA} HSV values.
 */
function cmykToHsv(cmyk: CMYK): HSVA {
  const [c, m, y, k] = cmyk;
  const _c = c / 100,
    _m = m / 100,
    _y = y / 100,
    _k = k / 100;

  const r = (1 - Math.min(1, _c * (1 - _k) + _k)) * 255;
  const g = (1 - Math.min(1, _m * (1 - _k) + _k)) * 255;
  const b = (1 - Math.min(1, _y * (1 - _k) + _k)) * 255;
  const hsva: HSVA = rgbToHSV([r, g, b, 1]);

  hsva.toString = () => hsvaToString(hsva);
  return hsva;
}
export default cmykToHsv;
