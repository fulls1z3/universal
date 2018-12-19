// tslint:disable
import * as hammerjs from 'hammerjs';
import 'jest-preset-angular';

const mock = () => {
  let storage = {};

  return {
    getItem: key => key in storage ? (storage as any)[key] : undefined,
    setItem: (key, value) => (storage as any)[key] = value || '',
    removeItem: key => delete (storage as any)[key],
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
