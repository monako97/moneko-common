import watermark from '../watermark';

describe('test watermark', () => {
  it('create', () => {
    expect(
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48dGV4dCB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJub25lIiB4PSI1MCIgeT0iNTAiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2U9IiMwMDAiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVVsdHJhbGlnaHQsc2Fucy1zZXJpZiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDUwIDUwKSI+aGVsbG88L3RleHQ+PC9zdmc+',
    ).toBe(watermark.create('hello'));
  });
});
