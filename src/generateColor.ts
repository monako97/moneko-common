import colorParse, { type HSVA } from './colorParse';
import hsvToHex from './hsvToHex';
import mixColor from './mixColor';

const hueStep = 2; // 色相阶梯
const saturationStep = 0.16; // 饱和度阶梯，浅色部分
const saturationStep2 = 0.05; // 饱和度阶梯，深色部分
const brightnessStep1 = 0.05; // 亮度阶梯，浅色部分
const brightnessStep2 = 0.15; // 亮度阶梯，深色部分
const lightColorCount = 5; // 浅色数量，主色上
const darkColorCount = 4; // 深色数量，主色下
// 暗色主题颜色映射关系表
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
];

function getHue(hsv: HSVA, i: number, light?: boolean): number {
  let hue: number;
  // 根据色相不同，色相转向不同

  if (Math.floor(hsv[0]) >= 60 && Math.floor(hsv[0]) <= 240) {
    hue = light ? Math.floor(hsv[0]) - hueStep * i : Math.floor(hsv[0]) + hueStep * i;
  } else {
    hue = light ? Math.floor(hsv[0]) + hueStep * i : Math.floor(hsv[0]) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}

function getSaturation(hsv: HSVA, i: number, light?: boolean): number {
  // 灰色不改变饱和度
  if (hsv[0] === 0 && hsv[1] === 0) {
    return hsv[1];
  }
  let saturation: number;

  if (light) {
    saturation = hsv[1] - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv[1] + saturationStep;
  } else {
    saturation = hsv[1] + saturationStep2 * i;
  }
  // 边界值修正
  if (saturation > 1) {
    saturation = 1;
  }
  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}

function getValue(hsv: HSVA, i: number, light?: boolean): number {
  let value: number;

  if (light) {
    value = hsv[2] + brightnessStep1 * i;
  } else {
    value = hsv[2] - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}

export interface ColorPatternOption {
  theme?: 'dark' | 'light';
  backgroundColor?: string;
}

function generateColor(color: string, opts: ColorPatternOption = {}): string[] {
  const patterns: string[] = [];
  const baseColor = colorParse(color);
  const [h, s, v, a] = baseColor.value;
  const hsv: HSVA = [h, s / 100, v / 100, a];

  for (let i = lightColorCount; i > 0; i -= 1) {
    patterns.push(
      hsvToHex([
        getHue(hsv, i, true),
        getSaturation(hsv, i, true) * 100,
        getValue(hsv, i, true) * 100,
        a,
      ]).toString()
    );
  }

  patterns.push(baseColor.toHexaString());
  for (let i = 1; i <= darkColorCount; i += 1) {
    patterns.push(
      hsvToHex([getHue(hsv, i), getSaturation(hsv, i) * 100, getValue(hsv, i) * 100, a]).toString()
    );
  }

  // 暗黑模式规则
  if (opts.theme === 'dark') {
    return darkColorMap.map(({ index, opacity }) => {
      return mixColor(opts.backgroundColor || '#141414', patterns[index], opacity);
    });
  }
  return patterns;
}

export default generateColor;
