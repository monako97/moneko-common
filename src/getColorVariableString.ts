import getColorPalette, { type ColorPatternOption } from './generateColor';

function getColorVariableString(
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

export default getColorVariableString;
