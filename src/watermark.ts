import stringToBase64Url from './stringToBase64Url';

/** 水印参数 */
export type WatermarkConfig = {
  /** 水印文字X轴位置
   * @default 50 */
  x: number;
  /** 水印文字Y轴位置
   * @default 50 */
  y: number;
  /** 水印宽度
   * @default 100 */
  width: number;
  /** 水印高度
   * @default 100 */
  height: number;
  /** 水印文字大小
   * @default 14 */
  fontSize: number;
  /** 水印文字旋转角度
   * @default -45 */
  angle: number;
  /** 水印文字透明度
   * @default 0.05 */
  opacity: number;
  /** 水印文字颜色
   * @default '#000' */
  color: string;
  /** 水印文字字体
   * @default 'PingFangSC-Ultralight,sans-serif' */
  fontFamily: string;
};

function getConfig(c?: Partial<WatermarkConfig>): WatermarkConfig {
  const {
    x = 50,
    y = 50,
    width = 100,
    height = 100,
    fontSize = 14,
    angle = -45,
    opacity = 0.05,
    color = '#000',
    fontFamily = 'PingFangSC-Ultralight,sans-serif',
  } = c || {};

  return {
    x,
    y,
    width,
    height,
    fontSize,
    angle,
    opacity,
    color,
    fontFamily,
  };
}
/**
 * 生成水印背景图的base64 url
 * @param {string} text - 水印文字
 * @param {Partial<WatermarkConfig>} [conf] - 水印参数
 * @returns {string} - 水印背景图的base64 url
 */
function create(text: string, conf?: Partial<WatermarkConfig>): string {
  const c = getConfig(conf);

  return `data:image/svg+xml;base64,${stringToBase64Url(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${c.width}" height="${
      c.height
    }"><text text-anchor="middle" dominant-baseline="middle" fill="none" x="${c.x}" y="${
      c.y
    }" stroke-opacity="${c.opacity}" stroke="${c.color}" font-size="${c.fontSize}" font-family="${
      c.fontFamily
    }" transform="rotate(${c.angle} ${c.width / 2} ${c.height / 2})">${text}</text></svg>`
  )}`;
}

/**
 * 更新水印，如果页面不存在水印则创建一个
 * @param {string | null | undefined} text - 水印文字, 传入 `null`、`undefined` 时删除水印
 * @param {WatermarkParamsType} [opt] - 水印参数
 * @returns {void}
 */
function update(
  text?: string | null,
  opt?: WatermarkConfig & {
    /** 水印更新的位置, CSS样式表选择器
     * @default ':root'
     */
    selector?: string;
  }
): void {
  const { selector = ':root', ...c } = opt || {};
  const old = getComputedStyle(document.documentElement).getPropertyValue('--watermark');
  let len = document.styleSheets.length;

  if (len === 0) {
    const style = document.createElement('style');

    document.head.appendChild(style);
    len = 1;
  }
  let styleSheet: CSSStyleSheet = document.styleSheets.item(0) as CSSStyleSheet;
  let rootRule: CSSStyleRule | undefined;

  for (let i = 0; i < len; i++) {
    styleSheet = document.styleSheets.item(i) as CSSStyleSheet;
    for (let j = 0, rlen = styleSheet.cssRules.length; j < rlen; j++) {
      const rule = styleSheet.cssRules[j] as CSSStyleRule;

      if (rule.selectorText === selector && rule.style.getPropertyValue('--watermark') === old) {
        rootRule = rule;
        break;
      }
    }
  }

  if (!text) {
    if (rootRule && old) {
      rootRule.style.removeProperty('--watermark');
    }
    return;
  }
  if (!rootRule) {
    styleSheet.insertRule(`${selector} {}`, styleSheet.cssRules.length);
    rootRule = styleSheet.cssRules[styleSheet.cssRules.length - 1] as CSSStyleRule;
  }
  /** 更新水印 */
  rootRule.style.setProperty('--watermark', `url(${create(text, getConfig(c))})`);
}

const watermark = {
  create,
  update,
};

export default watermark;
