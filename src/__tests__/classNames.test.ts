import classNames from '../classNames';

describe('test classname', () => {
  it('classNames', () => {
    const cls = classNames('btn', 'm');

    expect(cls).toBe('btn m');
    const clss = classNames('btn', null, 'a', 1 > 2 && 's', 'm');

    expect(clss).toBe('btn a m');
  });
});
