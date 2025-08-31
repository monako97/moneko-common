// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(target: any): target is object {
  const type = typeof target;

  return target !== null && (type == 'object' || type == 'function');
}
