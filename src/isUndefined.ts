// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUndefined(target: any): target is undefined {
  return 'undefined' === typeof target;
}
