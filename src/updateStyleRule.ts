/**
 * 更新样式表, 不存在则创建一个
 * @param {Record<string, string | null>} property - rules
 * @param {string} [selector = ':root'] - 更新的位置, CSS样式表选择器
 * @returns {void}
 */
function updateStyleRule(property: Record<string, string | null>, selector: string): void {
  let len = document.styleSheets.length;

  if (len === 0) {
    const style = document.createElement('style');

    document.head.appendChild(style);
    len = 1;
  }
  let styleSheet: CSSStyleSheet = document.styleSheets.item(0) as CSSStyleSheet;
  let styleRule: CSSStyleRule | undefined;

  for (let i = 0; i < len; i++) {
    styleSheet = document.styleSheets.item(i) as CSSStyleSheet;
    for (let j = 0, rlen = styleSheet.cssRules.length; j < rlen; j++) {
      const rule = styleSheet.cssRules[j] as CSSStyleRule;

      if (rule.selectorText === selector) {
        styleRule = rule;
        break;
      }
    }
  }

  if (!styleRule) {
    styleSheet.insertRule(`${selector} {}`, styleSheet.cssRules.length);
    styleRule = styleSheet.cssRules[styleSheet.cssRules.length - 1] as CSSStyleRule;
  }
  const keys = Object.keys(property);
  const el = document.querySelectorAll(selector);

  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    let old = null;

    for (let j = 0, e = el.length; j < e; j++) {
      old = getComputedStyle(el[j]).getPropertyValue(key);
    }

    if (property[key]) {
      /** 更新 */
      styleRule.style.setProperty(key, property[key]);
    } else if (old) {
      styleRule.style.removeProperty(key);
    }
  }
}

export default updateStyleRule;
