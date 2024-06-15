import getDataType from '../getDataType';

describe('test data-judgment', () => {
  it('getType', () => {
    expect('[object Function]').toBe(
      getDataType(
        {
          *names() {
            yield;
            return false;
          },
        }.names,
      ),
    );
  });
});
