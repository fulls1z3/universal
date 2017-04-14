// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

// libs
import { ServerTransferStateModule, TransferState } from '@nglibs/universal-transfer-state';
import { CacheService, CACHE } from '@ngx-cache/core';
import { ServerCacheModule, FsCache } from '@ngx-cache/platform-server';
import { STORAGE } from '@ngx-storage/core';
import { fsStorageFactory, FsStorageLoader, FsStorage } from '@ngx-storage/fs';

// modules & components
import { AppModule } from '../../client/app/app.module';
import { AppComponent } from '../../client/app/app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    ServerModule,
    ServerTransferStateModule,
    ServerCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: FsCache
      },
      {
        provide: STORAGE,
        useClass: FsStorage
      },
      {
        provide: FsStorageLoader,
        useFactory: (fsStorageFactory)
      }
    ]),
    AppModule
  ]
})
export class AppServerModule {
  constructor(private readonly transferState: TransferState,
              private readonly cache: CacheService) {
  }

  ngOnBootstrap = () => {
    this.transferState.set(this.cache.key, JSON.stringify(this.cache.dehydrate()));
    this.transferState.inject();
  }
}
