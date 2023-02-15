export function getPrefixCls<T extends string, P extends string>(
  className: T,
  prefixCls: P
): `${P}-${T}` {
  return `${prefixCls}-${className}`;
}

export function classNames(...cls: unknown[]) {
  return cls.filter(Boolean).join(' ');
}
