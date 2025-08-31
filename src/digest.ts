import { isUint8Array } from './isUint8Array';

export type AlgorithmIdentifier = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

/**
 * 为内容生成摘要
 * @since 1.8.0
 * @param {String | Uint8Array} message 内容字符串
 * @param {AlgorithmIdentifier} algorithm 摘要算法
 * @returns {Promise<String>} 摘要字符串
 */
export async function digest(
  message: string | Uint8Array,
  algorithm: AlgorithmIdentifier,
): Promise<string> {
  const msgBuffer = isUint8Array(message) ? message : new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest(algorithm, msgBuffer as BufferSource);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
