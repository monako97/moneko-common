export interface BannerTheme {
  primary?: string; // 主要背景色
  secondary?: string; // 文字背景色
  text?: string; // 文字颜色
  heart?: string; // 心形颜色
}

/**
 * 在控制台打印banner
 * @param {string} name 项目名称
 * @param {string} version 版本
 * @param {string} type 类型
 * @param {string} [domain] 域名
 * @param {BannerTheme} [theme] 主题配置
 * @param {string} [theme.primary] 主要背景色
 * @param {string} [theme.secondary] 文字背景色
 * @param {string} [theme.text] 文字颜色
 * @param {string} [theme.heart] 心形颜色
 *
 * @returns {void}
 */
export function printBanner(
  name: string,
  version: string,
  type: string,
  domain: string = '',
  theme: BannerTheme = {},
): void {
  // 使用 Function 构造器来避免被打包工具优化掉
  /* eslint-disable-next-line no-console */
  const log = Function.prototype.bind.call(console.log, console);

  try {
    const {
      primary = '#7581a8',
      secondary = '#30395b',
      text = '#fbf3c6',
      heart = '#ff2424',
    } = theme;
    const baseStyle = 'padding: 10px 0; line-height: 24px;';
    const styles = [
      `background: ${primary}; ${baseStyle}`,
      `background: ${primary}; ${baseStyle}`,
      `color: ${primary}; background: ${secondary}; ${baseStyle}`,
      `background: ${primary}; ${baseStyle}`,
      `background: ${text}; ${baseStyle} color: #333;`,
      `background: ${primary}; ${baseStyle}`,
      `color: ${heart}; background: #fff; ${baseStyle}`,
      `color: ${heart}; background: #fff; ${baseStyle}`,
      `color: ${heart}; background: #fff; ${baseStyle}`,
    ];
    const message = `\n %c %c %c ${name} ${version} - \u2730 ${type} \u2730  %c  %c  ( ^ _ ^ ) ${domain} %c  %c \u2665%c\u2665%c\u2665 \n`;

    log(message, ...styles);
  } catch {
    log(`${name} ${version} - ${type} - ${domain}`);
  }
}
