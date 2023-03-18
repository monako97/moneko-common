function paddingLength(length: number) {
  return (3 - (length % 3)) % 3 || 3;
}
/**
 * 将字符串转换为Base64Url格式的字符串。
 * @param {string} str - 需要转换的字符串。
 * @returns {string} 转换后的Base64Url格式的字符串。
 */
function stringToBase64Url(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const paddingChar = '=';
  const BLOCK_SIZE = 3;
  const outputLength = Math.ceil(data.length / BLOCK_SIZE) * 4;
  const output = new Uint8Array(outputLength);
  let inputIndex = 0;
  let outputIndex = 0;

  while (inputIndex < data.length) {
    const blockEnd = Math.min(inputIndex + BLOCK_SIZE, data.length);
    const block = data.subarray(inputIndex, blockEnd);

    inputIndex += BLOCK_SIZE;
    const value = (block[0] << 16) | (block[1] << 8) | block[2];

    for (let j = 0; j < 4 && outputIndex + j < outputLength; j++) {
      const shift = (3 - j) * 6;
      const index = (value >> shift) & 0x3f;

      output[outputIndex + j] = characters.charCodeAt(index);
    }
    outputIndex += 4;
  }
  for (let i = outputLength - 1; i >= outputLength - paddingLength(data.length); i--) {
    output[i] = paddingChar.charCodeAt(0);
  }
  return String.fromCharCode(...output)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/[=]==/g, 'mc+');
}

export default stringToBase64Url;
