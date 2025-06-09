let passiveSupported = false;

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true;
    },
  });

  window.addEventListener('test-passive-supported', function () {}, options);
} catch {
  void 0;
}

export default passiveSupported;
