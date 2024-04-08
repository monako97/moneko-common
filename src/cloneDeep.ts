function cloneDeep<T>(value: T, transfer?: StructuredSerializeOptions) {
  return structuredClone(value, transfer);
}

export default cloneDeep;
