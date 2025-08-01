import encodeText from './encodeText';

/**
 * @en Add two integers, wrapping at 2^32.
 * This uses 16-bit operations internally to work around bugs in interpreters.
 * @zh 添加两个整数，超过2^32时会自动取模
 * 使用16位操作内部来解决解释器中的错误
 * @param {number} y Second integer
 * @returns {number} Sum
 */
function safeAdd(x: number, y: number): number {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);

  return (msw << 16) | (lsw & 0xffff);
}

/**
 * @en Bitwise rotate a 32-bit number to the left.
 * @zh 将32位数字向左旋转
 * @param {number} num 32-bit number
 * @param {number} cnt Rotation count
 * @returns {number} Rotated number
 */
function bitRotateLeft(num: number, cnt: number): number {
  return (num << cnt) | (num >>> (32 - cnt));
}

function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}

function md5gg(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function md5hh(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
): number {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/**
 * @en Calculate the MD5 of an array of little-endian words, and a bit length.
 * @zh 计算一个数组的小端字节序的MD5值，以及一个位长度
 * @param {Array} x Array of little-endian words
 * @param {number} len Bit length
 * @returns {Array<number>} MD5 Array
 */
function binlMD5(x: number[], len: number): number[] {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  let i;
  let olda;
  let oldb;
  let oldc;
  let oldd;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}

/**
 * @en Convert an array of little-endian words to a string
 * @zh 将一个数组的小端字节序转换为字符串
 * @param {Array<number>} input MD5 Array
 * @returns {string} MD5 string
 */
function binl2rstr(input: number[]): string {
  let i;
  let output = '';
  const length32 = input.length * 32;

  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
  }
  return output;
}

/**
 * @en Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 * @zh 将一个原始字符串转换为小端字节序的数组
 * 大于255的字符将被忽略
 * @param {string} input Raw input string
 * @returns {Array<number>} Array of little-endian words
 */
function rstr2binl(input: string): number[] {
  let i: number;
  const output: (number | undefined)[] = [];

  output[(input.length >> 2) - 1] = void 0;
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  const length8 = input.length * 8;

  for (i = 0; i < length8; i += 8) {
    output[i >> 5]! |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
  }
  return output as number[];
}

/**
 * @en Calculate the MD5 of a raw string
 * @zh 计算一个原始字符串的MD5值
 * @param {string} s Input string
 * @returns {string} Raw MD5 string
 */
function rstrMD5(s: string): string {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}

/**
 * @en Calculates the HMAC-MD5 of a key and some data (raw strings)
 * @zh 计算一个密钥和一些数据的HMAC-MD5值（原始字符串）
 * @param {string} key HMAC key
 * @param {string} data Raw input string
 * @returns {string} Raw MD5 string
 */
function rstrHMACMD5(key: string, data: string): string {
  let i: number;
  let bkey: number[] = rstr2binl(key);
  const ipad: (number | undefined)[] = [];
  const opad: (number | undefined)[] = [];

  ipad[15] = opad[15] = void 0;
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }
  const hash: number[] = binlMD5(ipad.concat(rstr2binl(data)) as number[], 512 + data.length * 8);

  return binl2rstr(binlMD5(opad.concat(hash) as number[], 512 + 128));
}

/**
 * @en Convert a raw string to a hex string
 * @zh 将一个原始字符串转换为十六进制字符串
 * @param {string} input Raw input string
 * @returns {string} Hex encoded string
 */
function rstr2hex(input: string): string {
  const hexTab = '0123456789abcdef';
  let output = '';
  let x;
  let i;

  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
  }
  return output;
}

/**
 * @en Encodes input string as raw MD5 string
 * @zh 将一个字符串编码为原始的MD5字符串
 * @param {string} s Input string
 * @returns {string} Raw MD5 string
 */
function rawMD5(s: string): string {
  return rstrMD5(encodeText(s));
}
/**
 * @en Encodes input string as Hex encoded string
 * @zh 将一个字符串编码为十六进制字符串
 * @param {string} s Input string
 * @returns {string} Hex encoded string
 */
function hexMD5(s: string): string {
  return rstr2hex(rawMD5(s));
}
/**
 * @en Calculates the raw HMAC-MD5 for the given key and data
 * @zh 计算一个密钥和一些数据的原始HMAC-MD5值
 * @param {string} k HMAC key
 * @param {string} d Input string
 * @returns {string} Raw MD5 string
 */
function rawHMACMD5(k: string, d: string): string {
  return rstrHMACMD5(encodeText(k), encodeText(d));
}
/**
 * @en Calculates the Hex encoded HMAC-MD5 for the given key and data
 * @zh 计算一个密钥和一些数据的十六进制HMAC-MD5值
 * @param {string} k HMAC key
 * @param {string} d Input string
 * @returns {string} Raw MD5 string
 */
function hexHMACMD5(k: string, d: string): string {
  return rstr2hex(rawHMACMD5(k, d));
}

/**
 * @en Calculates MD5 value for a given string.
 * If a key is provided, calculates the HMAC-MD5 value.
 * Returns a Hex encoded string unless the raw argument is given.
 * @zh 计算一个给定字符串的MD5值。
 * 如果提供了一个密钥，计算HMAC-MD5值。
 * 除非提供raw参数，否则返回一个十六进制字符串。
 * @since 1.9.0
 *
 * @param {string} string Input string
 * @param {string} [key] HMAC key
 * @param {boolean} [raw] Raw output switch
 * @returns {string} MD5 output
 */
function md5(string: string, key?: string, raw?: boolean): string {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }
    return rawMD5(string);
  }
  if (!raw) {
    return hexHMACMD5(key, string);
  }
  return rawHMACMD5(key, string);
}

export default md5;
