import { type HSLA, type HSVA, type MaxNum, maxNum } from './colorParse';
import hsvaToString from './hsvaToString';

/**
 * 将 HSL 转换为 HSV
 * @param {HSLA} hsla hsla
 * @return {HSVA} HSVA
 */
function hslToHsv(hsla: HSLA): HSVA & { max: MaxNum['hsva'] } {
  const [h, s, l, a = 1] = hsla;
  const _l = l / 100;
  let _s = s / 100;

  _s *= _l < 0.5 ? _l : 1 - _l;
  const hsva = [
    h,
    Math.floor(_l + _s ? ((2 * _s) / (_l + _s)) * 100 : 0),
    Math.floor((_l + _s) * 100),
    a,
  ] as HSVA & { max: MaxNum['hsva'] };

  hsva.toString = () => hsvaToString(hsva);
  hsva.max = maxNum.hsva;
  return hsva;
}

export default hslToHsv;
