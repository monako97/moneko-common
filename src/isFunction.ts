// eslint-disable-next-line
function isFunction(target: any): target is VoidFunction | ((...v: any[]) => any) {
  return [
    '[object Function]',
    '[object AsyncFunction]',
    '[object GeneratorFunction]',
    '[object Proxy]',
  ].includes(Object.prototype.toString.call(target));
}

export default isFunction;
