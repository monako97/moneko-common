if (!global.structuredClone) {
  global.structuredClone = jest.fn((val) => {
    return JSON.parse(JSON.stringify(val));
  });
}
