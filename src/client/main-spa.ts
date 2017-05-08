// angular
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppModule } from './app/app.module';

export function main(): any {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

// HMR support
if (module['hot'])
  module['hot'].accept();

bootloader(main);
