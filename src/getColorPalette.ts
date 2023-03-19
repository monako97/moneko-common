import generateColor, { type ColorPatternOption } from './generateColor';
import tinycolor from './tinycolor';

const getColorPalette = (
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

export default getColorPalette;