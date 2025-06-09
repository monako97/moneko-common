import cmykToHsv from './cmykToHsv';
import hexToHsv from './hexToHsv';
import hslToHsv from './hslToHsv';
import hsvaToString from './hsvaToString';
import hsvToCmyk from './hsvToCmyk';
import hsvToHex from './hsvToHex';
import hsvToHsl from './hsvToHsl';
import hsvToRgb from './hsvToRgb';
import isColor, { type ColorType } from './isColor';
import rgbToHsv from './rgbToHsv';

export type HEXA = [h: string, e: string, x: string, a: string];
export type RGBA = [r: number, g: number, b: number, a: number];
export type HSVA = [h: number, s: number, v: number, a: number];
export type HSLA = [h: number, s: number, l: number, a: number];
/** 印刷四分色模式 */
export type CMYK = [c: number, m: number, y: number, k: number];

export interface ColorParse<T> {
  value: T;
  type: ColorType;
  toHexa(): HEXA;
  toHexaString(): string;
  toRgba(): RGBA & { max: MaxNum['rgba'] };
  toRgbaString(): string;
  toHsla(): HSLA & { max: MaxNum['hsla'] };
  toHslaString(): string;
  toCmyk(): CMYK & { max: MaxNum['cmyk'] };
  toCmykString(): string;
  toHsva(): HSVA & { max: MaxNum['hsva'] };
  toHsvaString(): string;
  /**
   * 互补颜色
   * @returns {string} color
   */
  complement(): string;

  setValue(value: T): ColorParse<T>;

  setAlpha(alpha: number): ColorParse<T>;
}

export type MaxNum = {
  cmyk: [100, 100, 100, 100];
  hsla: [360, 100, 100, 1];
  hsva: [360, 100, 100, 1];
  rgba: [255, 255, 255, 1];
};
export const maxNum: MaxNum = {
  cmyk: [100, 100, 100, 100],
  hsla: [360, 100, 100, 1],
  hsva: [360, 100, 100, 1],
  rgba: [255, 255, 255, 1],
};

export type Color<T extends ColorType = 'hsva'> = T extends 'cmyk'
  ? ColorParse<CMYK>
  : T extends 'rgba'
    ? ColorParse<RGBA>
    : T extends 'hsla'
      ? ColorParse<HSLA>
      : T extends 'hexa'
        ? ColorParse<HEXA>
        : T extends 'hsva'
          ? ColorParse<HSVA & { max: MaxNum['hsva'] }>
          : ColorParse<HSVA & { max: MaxNum['hsva'] }>;

/**
 * 将表示颜色的字符串解析为 HSV 数组, 通过toString()方法获取字符串值
 * 当前支持的类型是 cmyk、rgba、hsla、hexa、hsva、cmyk
 * @param {string} str color
 * @return {*} HSVA
 */
function color(str: string): Color {
  /**
   * 将颜色名称转换为 rgb/十六进制
   * @param {string} colorStr 颜色名称
   * @returns {string | CanvasGradient | CanvasPattern} color
   */
  function standardizeColor(colorStr: string): string | null {
    if (!colorStr.match(/^[a-zA-Z]+$/)) {
      return colorStr;
    }
    // 由于无效颜色将被解析为黑色，因此将其过滤掉
    if (colorStr.toLowerCase() === 'black') {
      return '#000000';
    }
    const ctx = document.createElement('canvas').getContext('2d');

    if (!ctx) {
      return null;
    }
    ctx.fillStyle = colorStr;
    return ctx.fillStyle === '#000000' ? null : ctx.fillStyle;
  }

  /**
   * 采用任何类型的数组，将表示数字的字符串转换为数字，将其他任何内容转换为未定义
   * @param {number[]} arr any
   * @return {(number | undefined)[]} s
   */
  function numarize(arr: string[]): (number | undefined)[] {
    // eslint-disable-next-line no-undefined
    return arr.map((v: string) => (/^(|\d+)\.\d+|\d+$/.test(v) ? Number(v) : undefined));
  }
  let hsva = [0, 0, 0, 1] as HSVA & { max: MaxNum['hsva'] };
  // 检查字符串是否是颜色名称
  const colorMatch = isColor(standardizeColor(str));
  const type = colorMatch?.type || 'hsva';
  const match = colorMatch?.match || ([0, 0, 0, 1] as unknown as RegExpExecArray);

  switch (type) {
    case 'cmyk': {
      const [, c = 0, m = 0, y = 0, k = 0] = numarize(match);
      const max = maxNum[type];

      if (c > max[0] || m > max[1] || y > max[2] || k > max[3]) break;
      hsva = cmykToHsv([c, m, y, k]);
      break;
    }
    case 'rgba': {
      const [, , , r = 0, g = 0, b = 0, a = 1] = numarize(match);
      const max = maxNum[type];

      if (r > max[0] || g > max[1] || b > max[2] || a < 0 || a > max[3]) break;
      hsva = rgbToHsv([r, g, b, a]);
      break;
    }
    case 'hexa': {
      const [, hex] = match;

      hsva = hexToHsv(hex);
      break;
    }
    case 'hsla': {
      const [, , , h = 0, s = 0, l = 0, a = 1] = numarize(match);
      const max = maxNum[type];

      if (h > max[0] || s > max[1] || l > max[2] || a < 0 || a > max[3]) break;
      hsva = hslToHsv([h, s, l, a]);
      break;
    }
    case 'hsva': {
      const [, , , h = 0, s = 0, v = 0, a = 1] = numarize(match);
      const max = maxNum[type];

      if (h > max[0] || s > max[1] || v > max[2] || a < 0 || a > max[3]) break;
      hsva = [h, s, v, a] as HSVA & { max: MaxNum['hsva'] };
      break;
    }
    default:
      break;
  }

  hsva.toString = () => hsvaToString(hsva);
  hsva.max = maxNum.hsva;
  const c: Color<'hsva'> = {
    value: hsva,
    type: colorMatch?.type || 'hsva',
    complement: () => {
      const [r, g, b, a] = c.toRgba();

      return `rgba(${255 - r},${255 - g},${255 - b},${a})`;
    },
    toHsva: () => {
      c.value.toString = () => hsvaToString(c.value);
      c.value.max = maxNum.hsva;
      return c.value;
    },
    toHsvaString: () => c.value.toString(),
    toHexa: () => hsvToHex(c.value),
    toHexaString: () => hsvToHex(c.value).toString(),
    toRgba: () => hsvToRgb(c.value),
    toRgbaString: () => hsvToRgb(c.value).toString(),
    toHsla: () => hsvToHsl(c.value),
    toHslaString: () => hsvToHsl(c.value).toString(),
    toCmyk: () => hsvToCmyk(c.value),
    toCmykString: () => hsvToCmyk(c.value).toString(),
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
