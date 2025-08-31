import { stringToBase64Url } from '../stringToBase64Url';

describe('test stringToBase64Url', () => {
  it('stringToBase64Url', () => {
    expect('aGVsbG8=').toBe(stringToBase64Url('hello'));
  });
});
