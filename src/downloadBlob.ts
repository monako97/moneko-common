export interface Navigator {
  msSaveBlob?: (blob: Blob, defaultName?: string) => string;
}

const fragment = document.createDocumentFragment();

/**
 * 保存Blob对象到本地
 * @constructor
 * @param {Blob} blob Blob
 * @param {string} fileName 文件名
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  // window.navigator.msSaveBlob：以本地方式保存文件
  const { msSaveBlob } = window.navigator as Navigator;

  if (msSaveBlob) {
    msSaveBlob(blob, fileName);
    return;
  }
  // 获取 URL
  const URL = window.URL || window.webkitURL;
  // 创建新的URL表示指定的File对象或者Blob对象
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = objectUrl;
  a.download = fileName;
  fragment.appendChild(a);
  a.click();
  fragment.removeChild(a);
  // 清除对象
  URL.revokeObjectURL(objectUrl);
}
