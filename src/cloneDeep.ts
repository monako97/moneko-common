export function cloneDeep<T>(value: T, transfer?: StructuredSerializeOptions): T {
  return structuredClone<T>(value, transfer);
}
