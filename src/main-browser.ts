// angular
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppBrowserModule } from '~/app/app.browser.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';

if (environment.production)
  enableProdMode();

const main = () => platformBrowserDynamic()
  .bootstrapModule(AppBrowserModule);

// hmr support
if (environment.hmr)
  if (module['hot'])
    hmrBootstrap(module, main);
  else
    console.error('HMR is not enabled for webpack-dev-server!');
else
  bootloader(main);
