import { type HSLA, type HSVA, type MaxNum, maxNum } from './colorParse';

/**
 * 将 HSV 光谱转换为 HSL
 * @param {HSVA} hsva 色
 * @returns {HSLA} HSL values
 */
function hsvToHsl(hsva: HSVA): HSLA & { max: MaxNum['hsla'] } {
  const [h, s, v, a = 1] = hsva;
  let _s = s / 100;
  const _v = v / 100;
  const l = ((2 - _s) * _v) / 2;

  if (l !== 0) {
    if (l === 1) {
      _s = 0;
    } else if (l < 0.5) {
      _s = (_s * _v) / (l * 2);
    } else {
      _s = (_s * _v) / (2 - l * 2);
    }
  }
  const hsla = [h, Math.floor(_s * 100), Math.floor(l * 100), a] as HSLA & { max: MaxNum['hsla'] };

  hsla.toString = () => {
    if (hsla[3] && hsla[3] < 1) {
      return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${a})`;
    }
    return `hsl(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%)`;
  };
  hsla.max = maxNum.hsla;
  return hsla;
}
export default hsvToHsl;
