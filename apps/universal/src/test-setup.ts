import 'hammerjs/hammer';
// tslint:disable-next-line:no-import-side-effect
import 'jest-preset-angular';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => ''
  })
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true
  })
});
