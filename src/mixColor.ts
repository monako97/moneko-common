import { colorParse } from './colorParse';
import { rgbToHex } from './rgbToHex';

export function mixColor(c1: string, c2: string, percent: number) {
  const _percent = percent > 1 ? percent / 100 : percent;
  const weight = 1 - _percent;
  const rgb1 = colorParse(c1).toRgba();
  const rgb2 = colorParse(c2).toRgba();

  return rgbToHex([
    rgb1[0] * weight + rgb2[0] * _percent,
    rgb1[1] * weight + rgb2[1] * _percent,
    rgb1[2] * weight + rgb2[2] * _percent,
    rgb1[3] * weight + rgb2[3] * _percent,
  ]).toString();
}
