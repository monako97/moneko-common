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
    [`--${opt.name}-active`]: colors[6],
    [`--${opt.name}-hover`]: colors[4],
    [`--${opt.name}-bg`]: colors[0],
    [`--${opt.name}-border`]: colors[2],
    [`--${opt.name}-outline`]: colorParse(color).setAlpha(0.2).toRgbaString(),
  };
};

export default getColorPalette;
