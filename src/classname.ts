export const getPrefixCls = <T extends string, P extends string>(
  className: T,
  prefixCls: P
): `${P}-${T}` => `${prefixCls}-${className}`;

export const classNames = (...cls: unknown[]) => cls.filter(Boolean).join(' ');
