import isString from '../isString';

describe('test data-judgment', () => {
  it('isString', () => {
    expect(false).toBe(isString({ a: 1 }));
    expect(true).toBe(isString('null'));
  });
});
