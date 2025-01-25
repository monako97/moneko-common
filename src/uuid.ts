function uuid() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => {
    const num = c as unknown as number;

    return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
  });
}

export default uuid;
