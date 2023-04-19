import hsvaToString from './hsvaToString';
import type { HSLA, HSVA } from './colorParse';

/**
 * 将 HSL 转换为 HSV
 * @param {HSLA} hsla hsla
 * @return {HSVA} HSVA
 */
function hslToHsv(hsla: HSLA): HSVA {
  const [h, s, l, a = 1] = hsla;
  const _l = l / 100;
  let _s = s / 100;

  _s *= _l < 0.5 ? _l : 1 - _l;
  const hsva: HSVA = [
    h,
    Math.floor(_l + _s ? ((2 * _s) / (_l + _s)) * 100 : 0),
    Math.floor((_l + _s) * 100),
    a,
  ];

  hsva.toString = () => hsvaToString(hsva);
  return hsva;
}

export default hslToHsv;
