export const getPrefixCls = (className: string, prefixCls = 'neko') =>
  `${prefixCls}-${className}`;

export const classNames = (cls?: (string | undefined | null | boolean | number)[]) =>
  cls?.filter(Boolean).join(' ');
