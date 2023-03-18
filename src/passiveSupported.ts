let passiveSupported = false;

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true;
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.addEventListener('test-passive-supported', function () {}, options);
  // eslint-disable-next-line no-empty
} catch (err) {}

export default passiveSupported;
