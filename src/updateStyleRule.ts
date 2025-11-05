const cache: Record<string, CSSStyleRule> = {};

/**
 * 更新样式表, 不存在则创建一个
 * @param {Record<string, string | number | null>} property - rules
 * @param {string} [selector = ':root'] - 更新的位置, CSS样式表选择器
 * @returns {void}
 */
export function updateStyleRule(
  property: Record<string, string | number | null>,
  selector: string,
): void {
  let len = document.styleSheets.length;

  if (len === 0) {
    const style = document.createElement('style');

    document.head.appendChild(style);
    len = 1;
  }
  let styleSheet: CSSStyleSheet = document.styleSheets.item(0) as CSSStyleSheet;
  let styleRule: CSSStyleRule | undefined = cache[selector];

  if (!styleRule) {
    for (let i = 1; i < len; i++) {
      styleSheet = document.styleSheets.item(i) as CSSStyleSheet;
      for (let j = 0, rlen = styleSheet.cssRules.length; j < rlen; j++) {
        const rule = styleSheet.cssRules[j] as CSSStyleRule;

        if (rule.selectorText === selector) {
          styleRule = rule;
          break;
        }
      }
    }
  }

  const keys = Object.keys(property);

  if (!styleRule) {
    styleSheet?.insertRule(`${selector} {}`, styleSheet.cssRules.length);
    styleRule = styleSheet.cssRules[styleSheet.cssRules.length - 1] as CSSStyleRule;
  }
  cache[selector] = styleRule;

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];

    if (property[key] !== null) {
      styleRule.style.setProperty(key, property[key] as string);
    } else if (styleRule.style.getPropertyValue(key)) {
      styleRule.style.removeProperty(key);
    }
  }
}
