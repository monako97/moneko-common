import tinycolor2 from 'tinycolor2';

export const tinycolor = tinycolor2;

type HSV = tinycolor.ColorFormats.HSV;

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

function getHue(hsv: HSV, i: number, light?: boolean): number {
  let hue: number;
  // 根据色相不同，色相转向不同

  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}

function getSaturation(hsv: HSV, i: number, light?: boolean): number {
  // 灰色不改变饱和度
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation: number;

  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
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

function getValue(hsv: HSV, i: number, light?: boolean): number {
  let value: number;

  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
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
  const pColor = tinycolor(color);

  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsv = tinycolor(pColor).toHsv();
    const colorString: string = tinycolor(
      tinycolor({
        h: getHue(hsv, i, true),
        s: getSaturation(hsv, i, true),
        v: getValue(hsv, i, true),
      })
    ).toHexString();

    patterns.push(colorString);
  }
  patterns.push(tinycolor(pColor).toHexString());
  for (let i = 1; i <= darkColorCount; i += 1) {
    const hsv = tinycolor(pColor).toHsv();
    const colorString: string = tinycolor(
      tinycolor({
        h: getHue(hsv, i),
        s: getSaturation(hsv, i),
        v: getValue(hsv, i),
      })
    ).toHexString();

    patterns.push(colorString);
  }

  // 暗黑模式规则
  if (opts.theme === 'dark') {
    return darkColorMap.map(({ index, opacity }) => {
      const darkColorString: string = tinycolor(
        tinycolor.mix(
          tinycolor(opts.backgroundColor || '#141414'),
          tinycolor(patterns[index]),
          opacity * 100
        )
      ).toHexString();

      return darkColorString;
    });
  }
  return patterns;
}
export const getColorPalette = (
  color: string,
  opt: ColorPatternOption & {
    name: string;
  }
) => {
  const colors = generateColor(color, opt);

  return {
    [`--${opt.name}-color`]: colors[5],
    [`--${opt.name}-color-active`]: colors[6],
    [`--${opt.name}-color-hover`]: colors[4],
    [`--${opt.name}-color-bg`]: colors[0],
    [`--${opt.name}-color-border`]: colors[2],
    [`--${opt.name}-color-outline`]: tinycolor(colors[5]).setAlpha(0.2).toRgbString(),
  };
};
export function getColorVariableString(
  color: string,
  opt: ColorPatternOption & {
    name: string;
  }
): string {
  const gen = getColorPalette(color, opt);
  let variables = '';

  Object.entries(gen).forEach((e) => {
    variables += `${e.join(': ')};\n`;
  });
  return variables;
}

export default generateColor;