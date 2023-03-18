export type Transfer = {
  transfer: ReadonlyArray<import('worker_threads').TransferListItem>;
};

function cloneDeep<T>(value: T, transfer?: Transfer) {
  return structuredClone(value, transfer);
}

export default cloneDeep;
