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
 * console.log(byteStr); // Outputs a string of UTF-8 bytes (may look garbled)
 *
 * @example
 * // 将UTF-8字节序列转换回字节数组（Uint8Array）。
 * const bytes = new Uint8Array(Array.from(byteStr, c => c.charCodeAt(0)));
 * console.log(bytes); // Outputs the raw UTF-8 byte array
 *
 * @param {string} input - 要编码为UTF-8字节序列的输入字符串。
 * @param {string} [encoding="utf-8"] - 要编码的目标编码。
 * @param {TextDecoderOptions} [decoderOption] - 解码器选项。
 * @param {TextDecodeOptions} [decodeOption] - 解码选项。
 * @returns {string} 返回一个字符串，其中每个字符代表UTF-8编码数据的字节。
 * 注意：此字符串可能包含不可打印的字符。
 */
export function decodeText(
  input: string,
  encoding: string = 'utf-8',
  decoderOption?: TextDecoderOptions,
  decodeOption?: TextDecodeOptions,
): string {
  return new TextDecoder(encoding, decoderOption).decode(
    new Uint8Array(Array.from(input, (c) => c.charCodeAt(0))),
    decodeOption,
  );
}
