import 'jest-preset-angular';

const mock = () => {
  let storage = {};

  return {
    getItem: (key: string) => key in storage ? (storage as any)[key] : undefined,
    setItem: (key: string, value: any) => (storage as any)[key] = value || '',
    removeItem: (key: string) => delete (storage as any)[key],
    clear: () => storage = {}
  };
};

Object.defineProperty(window, 'CSS', {value: mock()});
Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
