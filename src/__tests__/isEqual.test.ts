/* eslint-disable no-console */
import isEqual from '../isEqual';

describe('test data-judgment', () => {
  it('isEqual', () => {
    expect(true).toBe(isEqual({ a: 1 }, { a: 1 }));
    expect(false).toBe(isEqual({ a: 1 }, { a: 2, c: 1 }));
    expect(false).toBe(isEqual({ a: 1 }, 2));
    expect(true).toBe(
      isEqual(
        {
          a: () => {
            console.log('a');
          },
        },
        {
          a: () => {
            console.log('a');
          },
        }
      )
    );
    expect(false).toBe(isEqual([1], []));
    expect(true).toBe(isEqual([1, { a: 's' }], [1, { a: 's' }]));
    expect(false).toBe(isEqual([1, { a: 's' }], [1, { a: 'b' }]));
  });
});
