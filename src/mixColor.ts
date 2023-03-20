import colorParse from './colorParse';
import rgbToHEX from './rgbToHEX';

function mixColor(c1: string, c2: string, percent: number) {
  const weight = 1 - percent;
  const rgb1 = colorParse(c1).toRGBA();
  const rgb2 = colorParse(c2).toRGBA();

  return rgbToHEX([
    rgb1[0] * weight + rgb2[0] * percent,
    rgb1[1] * weight + rgb2[1] * percent,
    rgb1[2] * weight + rgb2[2] * percent,
    rgb1[3] * weight + rgb2[3] * percent,
  ]).toString();
}

export default mixColor;
