import { throttle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      return setTimeout(cb, 0);
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) => {
      return clearTimeout(id);
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('leading 为 true (默认) 时，应该立即执行函数', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 10);

    throttledFn();
    throttledFn();
    jest.advanceTimersToNextTimer(11);
    expect(fn).toHaveBeenCalledTimes(1);
    throttledFn();
    jest.advanceTimersToNextTimer(11);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it('leading 为 false 时，不应该立即执行函数', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 10, {
      leading: false,
    });

    throttledFn();
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(0);
    jest.advanceTimersToNextTimer(20);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
