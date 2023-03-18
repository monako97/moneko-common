import isUndefined from '../isUndefined';

describe('test data-judgment', () => {
  it('isUndefined', () => {
    expect(false).toBe(isUndefined({ a: 1 }));
    // eslint-disable-next-line no-undefined
    expect(true).toBe(isUndefined(undefined));
  });
});
