/* eslint-disable no-console */
import functionEqual from '../functionEqual';

describe('test data-judgment', () => {
  it('functionEqual', () => {
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
    expect(true).toBe(functionEqual(a, b));
    expect(true).toBe(functionEqual(c, b));
    expect(false).toBe(functionEqual(namea, nameb));
  });
});
