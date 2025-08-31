// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUint8Array(target: any): target is Uint8Array {
  return Object.prototype.toString.call(target) === '[object Uint8Array]';
}
