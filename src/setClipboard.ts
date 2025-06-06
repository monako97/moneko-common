import isFunction from './isFunction';

function clipboardTimer(t: HTMLElement | Element) {
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
}

function success(target?: Element) {
  if (target) {
    target.setAttribute('data-copy', 'success');
    target.setAttribute('role', 'alert');
    target.setAttribute('aria-live', 'assertive');
    clipboardTimer(target);
  }
}
function error(target?: Element, onError?: (e: string) => void, e?: string) {
  if (target) {
    target.setAttribute('data-copy', 'failure');
    clipboardTimer(target);
  }
  if (isFunction(onError)) {
    onError(e);
  }
}
function unsecuredClipboard(text: string, target?: Element, onError?: (e: string) => void) {
  const inp = document.createElement('input');

  inp.value = text;
  inp.style.position = 'fixed';
  inp.style.opacity = '0';
  inp.style.zIndex = '-1000';
  document.body.appendChild(inp);
  inp.focus();
  inp.select();
  try {
    document.execCommand('copy');
    success(target);
  } catch (e) {
    error(target, onError, e as string);
  }
  document.body.removeChild(inp);
  inp.remove();
}
/**
 * 复制文本到剪切板
 * @param {string} text 内容
 * @param {Element} target 提示的节点
 * @param {Function} onError 失败的回调
 * @returns {Promise<void>} Promise<void>
 */
function setClipboard(text: string, target?: Element, onError?: (e: string) => void): void {
  if (typeof navigator.clipboard === 'undefined') {
    unsecuredClipboard(text, target, onError);
  } else {
    navigator.clipboard.writeText(text).then(
      function () {
        success(target);
      },
      function (e) {
        error(target, onError, e as string);
      },
    );
  }
}

export default setClipboard;
