import { NgModule } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AuthModule } from '@ngx-auth/core';
import { CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppModule, REQ_KEY } from './app.module';
import { AuthTestingModule } from './framework/auth/testing';
import { ConsoleService, CoreModule, WindowService } from './framework/core';

@NgModule({
  imports: [
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService
      }
    ]),
    AuthModule.forRoot(),
    AuthTestingModule,
    CoreModule.forRoot([
      {
        provide: WindowService,
        useFactory: () => window
      },
      {
        provide: ConsoleService,
        useFactory: () => console
      }
    ]),
    AppModule
  ],
  providers: [
    {
      provide: REQUEST,
      useFactory: (transferState: TransferState) => transferState.get<any>(REQ_KEY, {}),
      deps: [TransferState]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
