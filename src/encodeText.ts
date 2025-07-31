/**
 * @en Encodes a string into a sequence of UTF-8 bytes represented as a string of characters.
 * This is useful for creating a string representation of UTF-8 bytes,
 * but note that the output may contain unprintable or control characters.
 *
 * @zh 将字符串编码为UTF-8字节序列，表示为字符串。
 * 这对于创建UTF-8字节的字符串表示非常有用，
 * 但请注意，输出可能包含不可打印或控制字符。
 * @since 1.9.0
 *
 * @example
 * // 将字符串编码为UTF-8字节序列，表示为字符串。
 * const byteStr = encodeText("你好");
 * console.log(byteStr); // 输出一个UTF-8字节的字符串（可能看起来乱码）
 *
 * @example
 * // 将UTF-8字节序列转换回字节数组（Uint8Array）。
 * const bytes = new Uint8Array(Array.from(byteStr, c => c.charCodeAt(0)));
 * console.log(bytes); // 输出原始的UTF-8字节数组
 *
 * @param {string} input - 要编码为UTF-8字节序列的输入字符串。
 * @returns {string} 返回一个字符串，其中每个字符代表UTF-8编码数据的字节。
 *                   注意：此字符串可能包含不可打印的字符。
 * @throws {TypeError} 如果输入不是字符串。
 */
function encodeText(input: string): string {
  return String.fromCharCode(...new TextEncoder().encode(input));
}

export default encodeText;
