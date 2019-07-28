import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/bootloader';
import { get } from 'lodash/fp';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const main = async () => platformBrowserDynamic().bootstrapModule(AppBrowserModule);

// hmr support
if (environment.hmr) {
  if (get('hot')(module)) {
    hmrBootstrap(module, main);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
  }
} else {
  bootloader(main);
}
