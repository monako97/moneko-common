import isUint8Array from '../isUint8Array';

describe('test data-judgment', () => {
  it('isUint8Array', () => {
    expect(false).toBe(isUint8Array({ a: 1 }));
    expect(true).toBe(isUint8Array(new Uint8Array()));
  });
});
