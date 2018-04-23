// angular
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppBrowserModuleNgFactory } from './app/app.browser.module.ngfactory';

export function main(): any {
  return platformBrowser()
    .bootstrapModuleFactory(AppBrowserModuleNgFactory);
}

enableProdMode();
bootloader(main);
