import hsvaToString from './hsvaToString';
import type { RGBA, HSVA } from './colorParse';

/**
 * 将 RGB 转换为 HSV
 * @param {RGBA} rgba rgba
 * @return {HSVA} HSVA
 */
function rgbToHSV(rgba: RGBA): HSVA {
  const [r, g, b, a = 1] = rgba;
  const _r = r / 255,
    _g = g / 255,
    _b = b / 255;

  let h = 0,
    s;
  const minVal = Math.min(_r, _g, _b);
  const maxVal = Math.max(_r, _g, _b);
  const delta = maxVal - minVal;
  const v = maxVal;

  if (delta === 0) {
    h = s = 0;
  } else {
    s = delta / maxVal;
    const dr = ((maxVal - _r) / 6 + delta / 2) / delta;
    const dg = ((maxVal - _g) / 6 + delta / 2) / delta;
    const db = ((maxVal - _b) / 6 + delta / 2) / delta;

    if (_r === maxVal) {
      h = db - dg;
    } else if (_g === maxVal) {
      h = 1 / 3 + dr - db;
    } else if (_b === maxVal) {
      h = 2 / 3 + dg - dr;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  const hsva: HSVA = [Math.floor(h * 360), Math.floor(s * 100), Math.floor(v * 100), a];

  hsva.toString = () => hsvaToString(hsva);
  return hsva;
}

export default rgbToHSV;
