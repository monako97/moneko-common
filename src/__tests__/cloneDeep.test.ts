import cloneDeep from '../cloneDeep';

describe('test data-judgment', () => {
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
