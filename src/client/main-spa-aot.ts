// angular
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppModuleNgFactory } from './app/app.module.ngfactory';

export function main(): any {
  return platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
}

bootloader(main);
