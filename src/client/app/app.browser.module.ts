// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// libs
import { BrowserTransferStateModule } from '@nglibs/universal-transfer-state';
import { CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCache, STATE_ID } from '@ngx-cache/platform-browser';

// modules & components
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCache
      },
      {
        provide: STATE_ID,
        useValue: 'TRANSFER_STATE'
      }
    ]),
    AppModule
  ]
})
export class AppBrowserModule {
}
