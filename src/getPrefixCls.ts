export function getPrefixCls<T extends string, P extends string>(
  className: T,
  prefixCls: P,
): `${P}-${T}` {
  return `${prefixCls}-${className}`;
}
