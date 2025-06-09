import watermark from '../watermark';

describe('test watermark', () => {
  it('create', () => {
    expect(
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwIiBoZWlnaHQ9IjEwMCI+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0ibm9uZSIgeD0iMCIgeT0iNTAiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2U9IiMwMDAwMDAiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWktdGhpbiwgUGluZ0ZhbmdTQy1UaGluLCBNaWNyb3NvZnQgWWFIZWkgTGlnaHQsIE1pY3Jvc29mdCBKaGVuZ0hlaSBMaWdodCwgWXUgR290aGljIExpZ2h0LCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iMTAwIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTUgMCA1MCkiPmhlbGxvPC90ZXh0Pjwvc3ZnPg==',
    ).toBe(watermark.create('hello'));
  });
});
