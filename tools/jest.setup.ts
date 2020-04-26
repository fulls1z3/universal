import * as hammerjs from 'hammerjs';
// tslint:disable-next-line:no-import-side-effect
import 'jest-preset-angular';

const mock = () => {
  let storage = {};

  return {
    getItem: (key: any) => key in storage ? (storage as any)[key] : undefined,
    setItem: (key: any, value: any) => (storage as any)[key] = value || '',
    removeItem: (key: any) => delete (storage as any)[key],
    clear: () => storage = {}
  };
};

Object.defineProperty(window, 'CSS', {value: mock()});
Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'matchMedia', {value: jest.fn(() => ({matches: true}))});
Object.defineProperty(document, 'doctype', {value: '<!DOCTYPE html>'});

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

(window as any).Hammer = hammerjs;
