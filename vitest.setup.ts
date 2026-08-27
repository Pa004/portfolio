import "@testing-library/jest-dom/vitest";

const createCanvasCtx = (): Record<string, unknown> => {
  const noop = () => {};
  return {
    clearRect: noop,
    beginPath: noop,
    moveTo: noop,
    lineTo: noop,
    stroke: noop,
    fill: noop,
    closePath: noop,
    arc: noop,
    fillRect: noop,
    strokeRect: noop,
    save: noop,
    restore: noop,
    translate: noop,
    rotate: noop,
    scale: noop,
    setTransform: noop,
    createRadialGradient: () => ({ addColorStop: noop }),
    createLinearGradient: () => ({ addColorStop: noop }),
    measureText: () => ({ width: 0 }),
    getImageData: () => ({ data: new Uint8ClampedArray(0) }),
  };
};

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  configurable: true,
  value: () => createCanvasCtx(),
});

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  disconnect = () => {};
  observe = () => {};
  takeRecords = (): IntersectionObserverEntry[] => [];
  unobserve = () => {};
}

window.IntersectionObserver =
  window.IntersectionObserver || MockIntersectionObserver;

class MockResizeObserver implements ResizeObserver {
  disconnect = () => {};
  observe = () => {};
  unobserve = () => {};
}

window.ResizeObserver = window.ResizeObserver || MockResizeObserver;

const rafHandlers = new Map<number, FrameRequestCallback>();
let nextRafId = 1;

Object.defineProperty(window, "requestAnimationFrame", {
  configurable: true,
  value: (cb: FrameRequestCallback): number => {
    rafHandlers.set(nextRafId, cb);
    return nextRafId++;
  },
});

Object.defineProperty(window, "cancelAnimationFrame", {
  configurable: true,
  value: (id: number): void => {
    rafHandlers.delete(id);
  },
});

Object.defineProperty(window, "__flushFrame", {
  configurable: true,
  value: () => {
    for (const cb of [...rafHandlers.values()]) cb(Date.now());
  },
});
