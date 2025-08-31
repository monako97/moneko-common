import { getPrefixCls } from '../getPrefixCls';

describe('test getPrefixCls', () => {
  it('getPrefixCls normal', () => {
    const cls = getPrefixCls('btn', 'neko');

    expect(cls).toBe('neko-btn');
  });

  it('getPrefixCls custom prefix', () => {
    const cls = getPrefixCls('btn', 'm');

    expect(cls).toBe('m-btn');
  });
});
