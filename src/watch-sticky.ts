import { isFunction } from './data-judgment';

class WatchSticky {
  private readonly topOb: IntersectionObserver;
  private readonly bottomOb: IntersectionObserver;
  private _isIntersecting = false;
  private topIsIntersecting = false;
  constructor(
    target: HTMLElement,
    root: HTMLElement | null,
    onSticky?: () => void,
    offSticky?: () => void
  ) {
    const parent = target.parentElement;
    const topValue = parseFloat(window.getComputedStyle(target).top) ?? 0;
    const elementHeight = target.getBoundingClientRect().height;
    const topSentinel = document.createElement('div');

    topSentinel.style.cssText = `position: relative;top: -${topValue}px;`;
    topSentinel.classList.add('_sticky_top');
    parent?.insertBefore(topSentinel, target);
    const bottomSentinel = document.createElement('div');

    bottomSentinel.style.cssText = `position: relative;top: ${-topValue - elementHeight}px;`;
    bottomSentinel.classList.add('_sticky_bottom');
    parent?.appendChild(bottomSentinel);
    this.topOb = new IntersectionObserver(
      ([entry]) => {
        const { boundingClientRect, rootBounds, isIntersecting } = entry;

        this.topIsIntersecting = isIntersecting;
        if (boundingClientRect.top < (rootBounds?.top || 0)) {
          if (!this._isIntersecting) {
            this._isIntersecting = true;
            onSticky?.();
          }
        }
        if (boundingClientRect.top >= (rootBounds?.top || 0)) {
          if (this._isIntersecting) {
            this._isIntersecting = false;
            offSticky?.();
          }
        }
      },
      { threshold: 0, root }
    );
    this.topOb.observe(topSentinel);
    this.bottomOb = new IntersectionObserver(
      ([entry]) => {
        const { boundingClientRect, rootBounds } = entry;

        if (boundingClientRect.top < (rootBounds?.bottom || 0)) {
          if (this._isIntersecting) {
            this._isIntersecting = false;
            if (isFunction(offSticky)) {
              offSticky();
            }
          }
        }
        if (boundingClientRect.top > (rootBounds?.top || 0) && !this.topIsIntersecting) {
          if (!this._isIntersecting) {
            this._isIntersecting = true;
            if (isFunction(onSticky)) {
              onSticky();
            }
          }
        }
      },
      { threshold: 0, root }
    );
    this.bottomOb.observe(bottomSentinel);
  }
  public disconnect() {
    this.topOb.disconnect();
    this.bottomOb.disconnect();
  }
}

export default WatchSticky;
