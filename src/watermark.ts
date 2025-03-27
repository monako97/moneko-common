import getMaxZindex from './getMaxZindex';
import stringToBase64Url from './stringToBase64Url';
import updateStyleRule from './updateStyleRule';

/** 水印参数 */
export type WatermarkConfig = {
  /** 水印文字X轴位置
   * @default width / 2 */
  x: number;
  /** 水印文字Y轴位置
   * @default height / 2 */
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
   * @default -15 */
  angle: number;
  /** 水印文字透明度
   * @default 0.03 */
  opacity: number;
  /** 水印文字颜色
   * @default '#000000' */
  color: string;
  /** 水印字重
   * @default 100 */
  fontWeight: number;
  /** 水印文字字体
   * @default 'PingFangSC-Ultralight,sans-serif' */
  fontFamily: string;
};

function getConfig(c?: Partial<WatermarkConfig>): WatermarkConfig {
  const {
    x,
    y,
    width = 180,
    height = 100,
    fontSize = 14,
    angle = -15,
    opacity = 0.03,
    color = '#000000',
    fontWeight = 100,
    fontFamily = 'system-ui-thin, PingFangSC-Thin, Microsoft YaHei Light, Microsoft JhengHei Light, Yu Gothic Light, sans-serif',
  } = c || {};

  return {
    x: x ?? width / 2,
    y: y ?? height / 2,
    width,
    height,
    fontSize,
    angle,
    opacity,
    color,
    fontWeight,
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
    }" font-weight="${c.fontWeight}" transform="rotate(${c.angle} ${c.width / 2} ${c.height / 2})">${text}</text></svg>`,
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
  opt?: Partial<WatermarkConfig> & {
    /** 水印更新的位置, CSS样式表选择器
     * @default ':root'
     */
    selector?: string;
  },
): void {
  const { selector = ':root::after', ...c } = opt || {};

  updateStyleRule(
    {
      position: 'fixed',
      top: 0,
      left: 0,
      'z-index': getMaxZindex(),
      width: '100vw',
      height: '100vh',
      'pointer-events': 'none',
      content: '""',
      'background-image': text ? `url(${create(text, getConfig(c))})` : null,
    },
    selector,
  );
}

const watermark = {
  create,
  update,
};

export default watermark;
