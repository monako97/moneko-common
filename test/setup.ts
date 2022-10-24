import "@testing-library/jest-dom/extend-expect";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
if (!global.structuredClone) {
  global.structuredClone = jest.fn((val) => {
    return JSON.parse(JSON.stringify(val));
  });
}
