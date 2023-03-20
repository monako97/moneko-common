import cmykToHsv from './cmykToHsv';
import hexToHsv from './hexToHsv';
import hslToHsv from './hslToHsv';
import hsvaToString from './hsvaToString';
import hsvToCmyk from './hsvToCmyk';
import hsvToHex from './hsvToHex';
import hsvToHsl from './hsvToHsl';
import hsvToRgb from './hsvToRgb';
import rgbToHsv from './rgbToHsv';

export interface ColorParse<T> {
  value: T;
  type: ColorType;
  toHexa(): HEXA;
  toHexaString(): string;
  toRgba(): RGBA;
  toRgbaString(): string;
  toHsla(): HSLA;
  toHslaString(): string;
  toCmyk(): CMYK;
  toCmykString(): string;
  toHsva(): HSVA;
  toHsvaString(): string;
  // eslint-disable-next-line no-unused-vars
  setValue(value: T): ColorParse<T>;
  // eslint-disable-next-line no-unused-vars
  setAlpha(alpha: number): ColorParse<T>;
  toString(): string;
}
export type HEXA = [h: string, e: string, x: string, a: string];
export type RGBA = [r: number, g: number, b: number, a: number];
export type HSVA = [h: number, s: number, v: number, a: number];
export type HSLA = [h: number, s: number, l: number, a: number];
export type CMYK = [c: number, m: number, y: number, k: number];

/**
 * 将颜色名称转换为 rgb/十六进制
 * @param {string} name 颜色名称
 * @returns {string | CanvasGradient | CanvasPattern} color
 */
function standardizeColor(name: string): string | CanvasGradient | CanvasPattern | null {
  // 由于无效颜色将被解析为黑色，因此将其过滤掉
  if (name.toLowerCase() === 'black') {
    return '#000000';
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = document.createElement('canvas').getContext('2d')!;

  ctx.fillStyle = name;
  return ctx.fillStyle === '#000000' ? null : ctx.fillStyle;
}

export type ColorType = keyof typeof colorRegex;
// 匹配不同类型颜色表示的正则表达式
const colorRegex = {
  cmyk: /^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,
  rgba: /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
  hsla: /^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
  hsva: /^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
  hexa: /^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i,
};
const colorType = ['cmyk', 'rgba', 'hsla', 'hsva', 'hexa'];
/**
 * 采用任何类型的数组，将表示数字的字符串转换为数字，将其他任何内容转换为未定义
 * @param {number[]} arr any
 * @return {*} s
 */
const numarize = (arr: string[]) =>
  // eslint-disable-next-line no-undefined
  arr.map((v: string) => (/^(|\d+)\.\d+|\d+$/.test(v) ? Number(v) : undefined));

export type Color<T extends ColorType = 'hsva'> = T extends 'cmyk'
  ? ColorParse<CMYK>
  : T extends 'rgba'
  ? ColorParse<RGBA>
  : T extends 'hsla'
  ? ColorParse<HSLA>
  : T extends 'hexa'
  ? ColorParse<HEXA>
  : T extends 'hsva'
  ? ColorParse<HSVA>
  : ColorParse<HSVA>;
/**
 * 将表示颜色的字符串解析为 HSV 数组, 通过toString()方法获取字符串值
 * 当前支持的类型是 cmyk、rgba、hsla、hexa、hsva、cmyk
 * @param {string} str color
 * @return {*} HSVA
 */
function color(str: string): Color {
  const defaultHsva: HSVA = [0, 0, 0, 1];
  let hsva: HSVA = defaultHsva;
  let type: ColorType = 'hsva';
  // 检查字符串是否是颜色名称
  const _str = str.match(/^[a-zA-Z]+$/) ? standardizeColor(str) : str;

  let match;

  for (let i = 0, len = colorType.length; i < len; i++) {
    const key = colorType[i];

    // 检查当前方案是否通过
    if (!(match = colorRegex[key as ColorType].exec(_str as string))) {
      continue;
    }
    // match[2] 仅在 rgba、hsla 或 hsla 匹配时才包含真实值
    // const alpha = !!match[2];
    switch (key) {
      case 'cmyk': {
        const [, c = 0, m = 0, y = 0, k = 0] = numarize(match);

        if (c > 100 || m > 100 || y > 100 || k > 100) break;
        hsva = cmykToHsv([c, m, y, k]);
        type = key;
        break;
      }
      case 'rgba': {
        const [, , , r = 0, g = 0, b = 0, a = 1] = numarize(match);

        if (r > 255 || g > 255 || b > 255 || a < 0 || a > 1) break;
        hsva = rgbToHsv([r, g, b, a]);
        type = key;
        break;
      }
      case 'hexa': {
        const [, hex] = match;

        hsva = hexToHsv(hex);
        type = key;
        break;
      }
      case 'hsla': {
        const [, , , h = 0, s = 0, l = 0, a = 1] = numarize(match);

        if (h > 360 || s > 100 || l > 100 || a < 0 || a > 1) break;
        hsva = hslToHsv([h, s, l, a]);
        type = key;
        break;
      }
      case 'hsva': {
        const [, , , h = 0, s = 0, v = 0, a = 1] = numarize(match);

        if (h > 360 || s > 100 || v > 100 || a < 0 || a > 1) break;
        hsva = [h, s, v, a];
        type = key;
        break;
      }
      default:
        break;
    }
  }
  const c: Color<'hsva'> = {
    value: hsva,
    type: type,
    toString: () => hsvaToString(c.value),
    toHexa: () => hsvToHex(c.value),
    toHexaString: () => hsvToHex(c.value).toString(),
    toRgba: () => hsvToRgb(c.value),
    toRgbaString: () => hsvToRgb(c.value).toString(),
    toHsla: () => hsvToHsl(c.value),
    toHslaString: () => hsvToHsl(c.value).toString(),
    toCmyk: () => hsvToCmyk(c.value),
    toCmykString: () => hsvToCmyk(c.value).toString(),
    toHsva: () => c.value,
    toHsvaString: () => hsvaToString(c.value),
    setValue(value) {
      c.value = value;
      return c;
    },
    setAlpha(alpha) {
      c.value[3] = alpha;
      return c;
    },
  };

  return c;
}

export default color;
