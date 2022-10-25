export const getPrefixCls = (className: string, prefixCls = 'neko') => `${prefixCls}-${className}`;

export const classNames = (...cls: unknown[]) => cls.filter(Boolean).join(' ');
