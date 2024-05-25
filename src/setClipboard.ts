import isFunction from './isFunction';

/**
 * 复制文本到剪切板
 * @param {string} text 内容
 * @param {Element} target 提示的节点
 * @param {Function} onError 失败的回调
 * @returns {Promise<void>} Promise<void>
 */
function setClipboard(
  text: string,
  target?: Element,
  // eslint-disable-next-line no-unused-vars
  onError?: (e: string) => void,
): void {
  const clipboardTimer = (t: HTMLElement | Element) => {
    let c: number | null = window.setTimeout(() => {
      t.setAttribute('data-copy-exit', '');
      if (c !== null) {
        window.clearTimeout(c);
        c = null;
      }
      let e: number | null = window.setTimeout(() => {
        t.removeAttribute('data-copy-exit');
        t.removeAttribute('data-copy');
        t.removeAttribute('role');
        t.removeAttribute('aria-live');
        if (e !== null) {
          window.clearTimeout(e);
          e = null;
        }
      }, 300);
    }, 4000);
  };

  if (typeof navigator.clipboard === 'undefined') {
    if (target) {
      target.setAttribute('data-copy', 'failure');
      clipboardTimer(target);
    }
    if (isFunction(onError)) {
      onError('Available only in secure contexts.');
    }
    return;
  }

  if (target) {
    navigator.clipboard.writeText(text).then(
      function () {
        target.setAttribute('data-copy', 'success');
        target.setAttribute('role', 'alert');
        target.setAttribute('aria-live', 'assertive');
        clipboardTimer(target);
      },
      function (e) {
        target.setAttribute('data-copy', 'failure');
        clipboardTimer(target);
        if (isFunction(onError)) {
          onError(e);
        }
      },
    );
  } else {
    navigator.clipboard.writeText(text);
  }
}

export default setClipboard;
