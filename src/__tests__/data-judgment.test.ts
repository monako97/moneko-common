/* eslint-disable no-console */
import {
  getType,
  isEqual,
  isFunction,
  isObject,
  isUndefined,
  isString,
  isSvgElement,
  functionsEqual,
  cloneDeep,
} from '../data-judgment';

describe('test data-judgment', () => {
  it('getType', () => {
    expect('[object GeneratorFunction]').toBe(
      getType(
        {
          *names() {
            yield;
            return false;
          },
        }.names
      )
    );
  });

  it('isFunction', () => {
    expect(false).toBe(isFunction(null));
    expect(false).toBe(isFunction({ a: 1 }));
    expect(true).toBe(isFunction(() => false));
  });

  it('isString', () => {
    expect(false).toBe(isString({ a: 1 }));
    expect(true).toBe(isString('null'));
  });

  it('isObject', () => {
    expect(false).toBe(isObject('s'));
    expect(true).toBe(isObject({ a: 1 }));
  });

  it('isUndefined', () => {
    expect(false).toBe(isUndefined({ a: 1 }));
    // eslint-disable-next-line no-undefined
    expect(true).toBe(isUndefined(undefined));
  });
  it('isSvgElement', () => {
    expect(false).toBe(isSvgElement({ a: 1 }));
  });
  it('functionsEqual', () => {
    const a = (msg: string) => {
      console.log(msg);
    };
    const b = a;
    const c = (msg: string) => {
      console.log(msg);
    };

    function namea() {
      const a1 = 1;

      console.log(a1);
    }
    function nameb() {
      const a1 = 1;

      console.log(a1);
    }
    expect(true).toBe(functionsEqual(a, b));
    expect(true).toBe(functionsEqual(c, b));
    expect(false).toBe(functionsEqual(namea, nameb));
  });

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

  it('cloneDeep', () => {
    const obj = {
      a: 2,
    };
    const newObj = cloneDeep(obj);

    obj.a = 3;
    expect(obj.a).toBe(3);
    expect(newObj.a).toBe(2);
  });
});
