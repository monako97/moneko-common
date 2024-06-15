import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

if (!global.structuredClone) {
  global.structuredClone = jest.fn((val) => {
    return JSON.parse(JSON.stringify(val));
  });
}
