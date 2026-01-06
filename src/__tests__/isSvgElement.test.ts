import { isSvgElement } from '@moneko/common';

describe('test data-judgment', () => {
  it('isSvgElement', () => {
    expect(false).toBe(isSvgElement({ a: 1 }));
  });
});
