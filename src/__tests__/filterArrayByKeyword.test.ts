import { filterArrayByKeyword } from '../filterArrayByKeyword';

describe('test arraySearch', () => {
  it('arraySearch', () => {
    expect(JSON.stringify([])).toBe(JSON.stringify(filterArrayByKeyword(['Alice'], ' ')));
    const data = [
      { id: 1, name: 'Alice', infos: [{ age: 30, city: 'New York' }] },
      {
        id: 2,
        name: 'Bob',
        infos: [
          {
            age: 25,
            city: 'Los Angeles',
            aa: [{ name: 'CSCASCA' }, { name: 'CCC' }],
          },
        ],
      },
      { id: 3, name: 'Charlie', infos: [{ age: 35, city: 'Chicago' }] },
    ];

    expect(JSON.stringify([{ id: 1, name: 'Alice', infos: [{ age: 30, city: 'New York' }] }])).toBe(
      JSON.stringify(filterArrayByKeyword(data, 'Alice')),
    );
    expect(JSON.stringify([{ infos: [{ age: 30, city: 'New York' }], id: 1, name: 'Alice' }])).toBe(
      JSON.stringify(filterArrayByKeyword(data, '30')),
    );
    expect(
      JSON.stringify([
        {
          infos: [
            {
              aa: [{ name: 'CCC' }],
              age: 25,
              city: 'Los Angeles',
            },
          ],
          id: 2,
          name: 'Bob',
        },
      ]),
    ).toBe(JSON.stringify(filterArrayByKeyword(data, 'CCC')));
    expect(JSON.stringify(['Bob'])).toBe(
      JSON.stringify(
        filterArrayByKeyword(['Bob', 'Alice', 'Charlie', 123, true, null, void 0], 'Bob'),
      ),
    );
    expect(JSON.stringify([1])).toBe(JSON.stringify(filterArrayByKeyword([1], '')));
    expect(
      JSON.stringify([
        {
          a: 'aa',
        },
      ]),
    ).toBe(
      JSON.stringify(
        filterArrayByKeyword(
          [
            'Charlie',
            () => {},
            [Date(), 'csa'],
            123,
            {
              a: 'aa',
            },
          ],
          'aa',
        ),
      ),
    );
  });
});
