// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUndefined(target: any): target is undefined {
  return 'undefined' === typeof target;
}

export default isUndefined;
