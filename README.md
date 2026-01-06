[home-url]: https://monako97.github.io/moneko-common
[docs-url]: https://monako97.github.io/moneko-common
[docs-tag]: https://h5static.dewucdn.com/node-common/75de0360-fb9b-cde5-0b4e-02b3df87915c.svg
[npm-url]: https://npmjs.org/package/@moneko/common
[install-tag]: https://nodei.co/npm/@moneko/common.png
[version-tag]: https://img.shields.io/npm/v/@moneko/common/latest.svg?logo=npm
[size-tag]: https://packagephobia.com/badge?p=@moneko/common@latest
[size-url]: https://packagephobia.com/result?p=@moneko/common@latest
[download-tag]: https://img.shields.io/npm/dm/@moneko/common.svg?logo=docusign
[x-tag]: https://img.shields.io/twitter/follow/moneko97.svg?style=social

# @moneko/common

🐾 🐾 🐾 🐾

> 这是一个通用 JavaScript/TypeScript 工具集

[![docs-ui][docs-tag]][docs-url]

[![version][version-tag]][npm-url]
[![install size][size-tag]][size-url]
[![download][download-tag]][npm-url]
![x][x-tag]

[![GitHub Actions CI](https://github.com/monako97/moneko-common/actions/workflows/cd.yml/badge.svg?style=flat-square)](https://github.com/monako97/moneko-common/actions/workflows/cd.yml)

[![@moneko/common][install-tag]][npm-url]

## 安装

```shell
npm install @moneko/common -S
# or
yarn add @moneko/common -S
# or
pnpm add @moneko/common -S
```

## 按需引入

`@moneko/common` 默认支持基于 ES modules 的 tree shaking，直接引入即可获得按需加载效果：

```javascript
import { cloneDeep, uuid } from '@moneko/common';
```

## API 参考

| 函数                 | 说明                                                               |   版本 |
| :------------------- | :----------------------------------------------------------------- | -----: |
| cloneDeep            | 深拷贝                                                             |      - |
| cmykToHsv            | 将 CMYK 转换为 HSV                                                 |      - |
| colorParse           | 将表示颜色的字符串解析为 HSV 数组, 通过 toString()方法获取字符串值 |      - |
| decodeText           | 解码文本                                                           |  1.9.0 |
| digest               | 摘要算法                                                           |  1.8.0 |
| downloadBlob         | 下载 Blob 对象                                                     |      - |
| encodeText           | 编码文本                                                           |  1.9.0 |
| entityToString       | 实体转换为字符串                                                   |      - |
| filterArrayByKeyword | 根据关键词过滤数组元素                                             | 1.11.0 |
| frameCallback        | 帧回调                                                             |      - |
| fullscreen           | 全屏操作                                                           |      - |
| getClientSize        | 获取客户端尺寸                                                     |      - |
| getColorContrast     | 获取颜色对比度                                                     |      - |
| getDataType          | 获取数据类型                                                       |      - |
| getMaxZindex         | 获取最大 z-index 值                                                |      - |
| getPrefixCls         | 获取类名前缀                                                       |      - |
| getScrollTop         | 获取滚动位置                                                       |      - |
| hexToHsv             | 将 HEX 转换为 HSV                                                  |      - |
| hslToHsv             | 将 HSL 转换为 HSV                                                  |      - |
| hsvaToString         | 将 HSVA 转换为字符串                                               |      - |
| hsvToCmyk            | 将 HSV 转换为 CMYK                                                 |      - |
| hsvToHex             | 将 HSV 转换为 HEX                                                  |      - |
| hsvToHsl             | 将 HSV 转换为 HSL                                                  |      - |
| hsvToRgb             | 将 HSV 转换为 RGB                                                  |      - |
| isColor              | 判断是否为颜色值                                                   |      - |
| isElementInside      | 判断元素是否在容器内部                                             |      - |
| isEqual              | 判断两个值是否相等                                                 |      - |
| isFunction           | 判断是否为函数                                                     |      - |
| isObject             | 判断是否为对象                                                     |      - |
| isProxy              | 判断是否为代理对象                                                 |      - |
| isString             | 判断是否为字符串                                                   |      - |
| isSvgElement         | 判断是否为 SVG 元素                                                |      - |
| isUint8Array         | 判断是否为 Uint8Array                                              |      - |
| isUndefined          | 判断是否为 undefined                                               |      - |
| md5                  | MD5 哈希算法                                                       |  1.9.0 |
| mixColor             | 混合颜色                                                           |      - |
| onLCP                | 监听最大内容绘制                                                   |      - |
| passiveSupported     | 判断是否支持被动事件监听器                                         |      - |
| persistence          | 数据持久化                                                         |      - |
| printBanner          | 打印横幅                                                           |      - |
| printPicture         | 打印图片                                                           | 1.12.0 |
| rgbToHex             | 将 RGB 转换为 HEX                                                  |      - |
| rgbToHsv             | 将 RGB 转换为 HSV                                                  |      - |
| setClipboard         | 设置剪贴板内容                                                     |      - |
| stringToBase64Url    | 将字符串转换为 Base64 URL                                          |      - |
| textBounding         | 获取文本边界                                                       |      - |
| throttle             | 节流函数                                                           |      - |
| toneColor            | 色调颜色                                                           |      - |
| updateStyleRule      | 更新样式规则                                                       |      - |
| uuid                 | 生成 UUID                                                          |      - |
| watermark            | 水印功能                                                           |      - |
