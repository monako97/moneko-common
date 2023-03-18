import isFunction from '../isFunction';

describe('test data-judgment', () => {
  it('isFunction', () => {
    expect(false).toBe(isFunction(null));
    expect(false).toBe(isFunction({ a: 1 }));
    expect(true).toBe(isFunction(() => false));
  });
});
