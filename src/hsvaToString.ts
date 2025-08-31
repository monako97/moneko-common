import type { HSVA } from './colorParse';

export function hsvaToString(hsva: HSVA) {
  if (hsva[3] && hsva[3] < 1) {
    return `hsva(${hsva[0]}, ${hsva[1]}%, ${hsva[2]}%, ${hsva[3]})`;
  }
  return `hsv(${hsva[0]}, ${hsva[1]}%, ${hsva[2]}%)`;
}
