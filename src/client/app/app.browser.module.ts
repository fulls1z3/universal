// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// libs
import { BrowserStateTransferModule, DEFAULT_STATE_ID } from '@ngx-universal/state-transfer';
import { CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService, STATE_ID } from '@ngx-cache/platform-browser';
import { AuthModule } from '@ngx-auth/core';
import 'hammerjs';

// framework
import { ConsoleService, CoreModule, WindowService } from './framework/core/core.module';

// modules & components
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// for AoT compilation
export function windowFactory(): any {
  return window;
}

export function consoleFactory(): any {
  return console;
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app-id'}),
    BrowserAnimationsModule,
    BrowserStateTransferModule.forRoot(),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService
      },
      {
        provide: STATE_ID,
        useValue: DEFAULT_STATE_ID
      }
    ]),
    CoreModule.forRoot([
      {
        provide: WindowService,
        useFactory: windowFactory
      },
      {
        provide: ConsoleService,
        useFactory: consoleFactory
      }
    ]),
    AuthModule.forRoot(),
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
