// polyfills
import 'zone.js/dist/zone';
import 'reflect-metadata';

// angular
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppBrowserModule } from './app/app.browser.module';

export function main(): any {
  return platformBrowserDynamic().bootstrapModule(AppBrowserModule);
}

bootloader(main);
