import { isObject } from '../isObject';

describe('test data-judgment', () => {
  it('isObject', () => {
    expect(false).toBe(isObject('s'));
    expect(true).toBe(isObject({ a: 1 }));
  });
});
