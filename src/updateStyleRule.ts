/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

const __STYLE_RULES_CACHE__: Record<string, CSSStyleRule> = {};

/**
 * 检查 CSSRule 是否为 CSSStyleRule
 */
function isCSSStyleRule(rule: CSSRule): rule is CSSStyleRule {
  return 'selectorText' in rule && 'style' in rule;
}

/**
 * 安全地获取样式表的数量
 */
function getStyleSheetsLength(): number {
  try {
    return document?.styleSheets?.length ?? 0;
  } catch {
    return 0;
  }
}

/**
 * 安全地获取样式表
 */
function getStyleSheet(index: number): CSSStyleSheet | null {
  try {
    return document?.styleSheets?.item(index) ?? null;
  } catch {
    return null;
  }
}

/**
 * 创建并添加新的样式表
 */
function createStyleSheet(): void {
  if (!document?.head) return;
  const style = document.createElement('style');

  style.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(style);
}

/**
 * 查找匹配选择器的样式规则
 */
function findStyleRule(styleSheet: CSSStyleSheet, selector: string): CSSStyleRule | undefined {
  try {
    const rules = styleSheet.cssRules;
    const length = rules.length;

    for (let i = 0; i < length; i++) {
      const rule = rules[i];

      if (isCSSStyleRule(rule) && rule.selectorText === selector) {
        return rule;
      }
    }
    return;
  } catch {
    // 跨域样式表可能无法访问
    return;
  }
}

/**
 * 创建新的样式规则
 */
function createStyleRule(styleSheet: CSSStyleSheet, selector: string): CSSStyleRule | undefined {
  try {
    const rules = styleSheet.cssRules;

    styleSheet.insertRule(`${selector} {}`, rules.length);
    const lastRule = rules[rules.length - 1];

    return isCSSStyleRule(lastRule) ? lastRule : void 0;
  } catch {
    return;
  }
}

/**
 * 应用样式属性到规则
 */
function applyStyleProperties(
  styleRule: CSSStyleRule,
  property: Record<string, string | number | null>,
): void {
  const keys = Object.keys(property);

  for (const key of keys) {
    const value = property[key];

    if (value !== null) {
      // 将 number 类型转换为 string
      const stringValue = typeof value === 'number' ? String(value) : value;

      styleRule.style.setProperty(key, stringValue);
    } else if (styleRule.style.getPropertyValue(key)) {
      styleRule.style.removeProperty(key);
    }
  }
}

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
  if (!('styleSheets' in document)) return;
  let len = getStyleSheetsLength();

  if (len === 0) {
    createStyleSheet();
    len = 1;
  }
  const firstSheet = getStyleSheet(0);

  if (!firstSheet) return;
  let styleSheet: CSSStyleSheet = firstSheet;
  let styleRule: CSSStyleRule | undefined = __STYLE_RULES_CACHE__[selector];

  // 从缓存或遍历所有样式表查找规则（从索引1开始，因为索引0已经在firstSheet中）
  if (!styleRule) {
    for (let i = 1; i < len; i++) {
      const sheet = getStyleSheet(i);

      if (!sheet) continue;
      styleSheet = sheet;
      const foundRule = findStyleRule(sheet, selector);

      if (foundRule) {
        styleRule = foundRule;
        break;
      }
    }
  }
  // 如果没有找到规则，创建一个新的
  if (!styleRule) {
    styleRule = createStyleRule(styleSheet, selector);
    if (!styleRule) return;
  }
  // 缓存规则
  __STYLE_RULES_CACHE__[selector] = styleRule;
  // 应用样式属性
  applyStyleProperties(styleRule, property);
}
