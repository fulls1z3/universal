// polyfills
import 'zone.js/dist/zone';
// tslint:disable-next-line
import 'reflect-metadata';

// angular
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppBrowserModuleNgFactory } from './app/app.browser.module.ngfactory';

export function main(): any {
  return platformBrowserDynamic()
    .bootstrapModuleFactory(AppBrowserModuleNgFactory);
}

enableProdMode();
bootloader(main);
