// eslint-disable-next-line no-unused-vars
function isFunction(target: unknown): target is VoidFunction | ((...v: unknown[]) => unknown) {
  return [
    '[object Function]',
    '[object AsyncFunction]',
    '[object GeneratorFunction]',
    '[object Proxy]',
  ].includes(Object.prototype.toString.call(target));
}

export default isFunction;
