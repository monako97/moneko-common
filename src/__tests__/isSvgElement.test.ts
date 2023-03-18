import isSvgElement from '../isSvgElement';

describe('test data-judgment', () => {
  it('isSvgElement', () => {
    expect(false).toBe(isSvgElement({ a: 1 }));
  });
});
