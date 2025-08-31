export type ColorType = 'cmyk' | 'rgba' | 'hsla' | 'hsva' | 'hexa';
export type ColorMatch = {
  type: ColorType;
  match: RegExpExecArray;
};
export function isColor(str?: string | null) {
  if (!str) {
    return;
  }
  let check: ColorMatch | undefined;
  // 匹配不同类型颜色表示的正则表达式
  const colorRegex = {
    cmyk: /^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,
    rgba: /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
    hsla: /^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
    hsva: /^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
    hexa: /^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i,
  };

  const colorType = Object.keys(colorRegex) as ColorType[];

  for (let i = 0, len = colorType.length; i < len; i++) {
    const type = colorType[i];
    let match: RegExpExecArray | null;

    // 检查当前方案是否通过
    if (!(match = colorRegex[type].exec(str))) {
      continue;
    }
    check = {
      type: type,
      match: match,
    };
  }

  return check;
}
