import colorParse, { type RGBA } from './colorParse';
import rgbToHex from './rgbToHex';

type Tone = 0 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 98 | 99 | 100;
export type ToneColor = Record<Tone, string>;

export function toneColor(color: string, dark?: boolean): ToneColor {
  const baseColor = colorParse(color);
  const baseRgba = baseColor.toRgba();
  const tones: Tone[] = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
  const palette: Partial<ToneColor> = {
    0: dark ? '#ffffff' : '#000000',
    40: baseColor.toHexaString(),
    100: dark ? '#000000' : '#ffffff',
  };

  function getTint(rgba: RGBA, weight: number): RGBA {
    return [
      Math.round((255 - rgba[0]) * weight + rgba[0]),
      Math.round((255 - rgba[1]) * weight + rgba[1]),
      Math.round((255 - rgba[2]) * weight + rgba[2]),
      rgba[3],
    ];
  }

  function getShade(rgba: RGBA, weight: number): RGBA {
    const p = 1 - weight;

    return [Math.round(rgba[0] * p), Math.round(rgba[1] * p), Math.round(rgba[2] * p), rgba[3]];
  }

  for (let i = 0, len = tones.length; i < len; i++) {
    const tone: Tone = tones[i];

    if (tone === 100 || tone === 40 || tone === 0) {
      continue;
    }
    if (i < 5) {
      if (dark) {
        const weight = 0.85 - tone / 100 - 0.15 * (i - 1);

        palette[tone] = rgbToHex(getTint(baseRgba, weight)).toString();
      } else {
        const weight = 0.6 - tone / 100 - i * 0.3;

        palette[tone] = rgbToHex(getShade(baseRgba, 0.6 + weight * 0.4)).toString();
      }
      continue;
    }
    if (dark) {
      palette[tone] = rgbToHex(getShade(baseRgba, (tone / 100) * 0.93)).toString();
    } else {
      palette[tone] = rgbToHex(getTint(baseRgba, (tone / 100) * 0.99)).toString();
    }
  }

  return palette as ToneColor;
}

export default toneColor;
