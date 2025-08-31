/* eslint-disable no-console */
import { isEqual } from '../isEqual';

describe('test data-judgment', () => {
  it('isEqual', () => {
    expect(true).toBe(isEqual(1, 1));
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
        },
      ),
    );
    expect(false).toBe(isEqual([1], []));
    expect(true).toBe(isEqual([1, { a: 's' }], [1, { a: 's' }]));
    expect(false).toBe(isEqual([1, { a: 's' }], [1, { a: 'b' }]));

    expect(true).toBe(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
    expect(true).toBe(isEqual(new Proxy({ a: 1 }, {}), new Proxy({ a: 1 }, {})));

    expect(true).toBe(isEqual(Proxy.revocable({ a: 1 }, {}), Proxy.revocable({ a: 1 }, {})));

    expect(true).toBe(isEqual(1, 1));
    expect(true).toBe(isEqual('a', 'a'));
    expect(true).toBe(isEqual([1, 2, 3], [1, 2, 3]));
    expect(true).toBe(isEqual(new Date(2021, 1, 1), new Date(2021, 1, 1)));
    expect(true).toBe(isEqual(/abc/, /abc/));
    expect(false).toBe(isEqual(1, '1'));
    expect(false).toBe(isEqual([1, 2, 3], [1, 2]));
    expect(false).toBe(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 }));
    expect(true).toBe(isEqual(new Map([[1, { a: 1 }]]), new Map([[1, { a: 1 }]])));
    expect(true).toBe(
      isEqual(
        () => {},
        () => {},
      ),
    );
    expect(true).toBe(isEqual(new DataView(new ArrayBuffer(8)), new DataView(new ArrayBuffer(8))));
    expect(true).toBe(isEqual(new Int32Array([1, 2, 3]), new Int32Array([1, 2, 3])));

    const buffer1 = new ArrayBuffer(8);
    const buffer2 = new ArrayBuffer(8);

    new Uint8Array(buffer1).set([1, 2, 3, 4]);
    new Uint8Array(buffer2).set([1, 2, 3, 4]);
    expect(true).toBe(isEqual(buffer1, buffer2));

    const set1 = new Set([1, 2, { a: 1 }]);
    const set2 = new Set([1, 2, { a: 1 }]);

    expect(true).toBe(isEqual(set1, set2));

    const obj3 = { a: 1, b: { c: 2, self: {} } };
    const obj4 = { a: 1, b: { c: 2, self: {} } };

    obj3.b.self = obj3;
    obj4.b.self = obj4;

    expect(true).toBe(isEqual(obj3, obj4));
    const sym1 = Symbol('foo');
    const sym2 = Symbol('foo');

    expect(false).toBe(isEqual(sym1, sym2));
    expect(true).toBe(isEqual(sym1, sym1));

    const obj11 = { [sym1]: 1, a: 2 };
    const obj22 = { [sym1]: 1, a: 2 };

    expect(true).toBe(isEqual(obj11, obj22));

    const proxy3 = new Proxy({ a: 1 }, { get: () => 1 });
    const proxy4 = new Proxy({ a: 1 }, { get: () => 2 });

    expect(false).toBe(isEqual(proxy3, proxy4));
    const proxy31 = new Proxy({ a: 1 }, { get: () => obj22 });
    const proxy41 = new Proxy({ a: 1 }, { get: () => obj11 });

    expect(true).toBe(isEqual(proxy31.a, proxy41.a));

    const bigInt1 = BigInt(123);
    const bigInt2 = BigInt(123);

    expect(true).toBe(isEqual(bigInt1, bigInt2));
  });
});
