import type { HSVA, RGBA } from './colorParse';

/**
 * 将 HSV 光谱转换为 RGB
 * @param {HSVA} hsva 色
 * @returns {RGBA} RGB
 */
function hsvToRgb(hsva: HSVA): RGBA {
  const [h, s, v, a = 1] = hsva;
  const _h = (h / 360) * 6;
  const _s = s / 100;
  const _v = v / 100;
  const i = Math.floor(_h);
  const f = _h - i;
  const p = _v * (1 - _s);
  const q = _v * (1 - f * _s);
  const t = _v * (1 - (1 - f) * _s);
  const mod = i % 6;
  const r = Math.floor([_v, q, p, p, t, _v][mod] * 255);
  const g = Math.floor([t, _v, _v, q, p, p][mod] * 255);
  const b = Math.floor([p, p, t, _v, _v, q][mod] * 255);
  const rgba: RGBA = [r, g, b, a];

  rgba.toString = () => (a < 1 ? `rgba(${rgba.join(',')})` : `rgb(${rgba.slice(0, 3).join(',')})`);
  return rgba;
}

export default hsvToRgb;
