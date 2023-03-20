import colorParse from './colorParse';
import generateColor, { type ColorPatternOption } from './generateColor';

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
    [`--${opt.name}-color-outline`]: colorParse(color).setAlpha(0.2).toRGBA().toString(),
  };
};

export default getColorPalette;
