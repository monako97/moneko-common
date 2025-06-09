/**
 * 获取文本边界
 * @description
 * 计算文本边界, 返回文本的宽高
 * @example
 * // 初始化, 同样的文本将直接返回缓存数据, 免于重复计算
 * const getTextBounding = textBounding('14px');
 * // 计算文本边界
 * const rect = getTextBounding('hello !!!');
 * // 单独设置字体大小
 * const [width, height] = getTextBounding('hello !!! ssss', '12px');
 *
 * console.log({ width, height });
 */
function textBounding(
  initFontSize = '14px',
  declaration: Partial<Omit<CSSStyleDeclaration, 'cssText'>> = {},
) {
  const map = new Map<string, [width: number, height: number]>();
  const cssText = `position:absolute;visibility:hidden;height:auto;width:auto;white-space:pre;font-size:${initFontSize};`;

  return function (text: string | number, fontSize = initFontSize) {
    const key = `${text}${fontSize}${JSON.stringify(declaration)}`;

    if (!map.has(key)) {
      const div = document.createElement('div');

      div.style.cssText = cssText;
      div.style.fontSize = fontSize;
      for (const key in declaration) {
        if (Object.prototype.hasOwnProperty.call(declaration, key)) {
          if (declaration[key]) {
            div.style[key] = declaration[key];
          }
        }
      }
      div.textContent = `${text}`;
      document.body.appendChild(div);
      const rect = div.getBoundingClientRect();

      div.remove();
      map.set(key, [rect.width, rect.height]);
    }

    return map.get(key)!;
  };
}

export default textBounding;
