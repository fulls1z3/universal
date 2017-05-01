// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

// libs
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
import { CACHE, CacheService, STORAGE } from '@ngx-cache/core';
import { FsCacheService, ServerCacheModule } from '@ngx-cache/platform-server';
import { fsStorageFactory, FsStorageLoader, FsStorageService } from '@ngx-cache/fs-storage';

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
    ServerStateTransferModule.forRoot(),
    ServerCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: FsCacheService
      },
      {
        provide: STORAGE,
        useClass: FsStorageService
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
  constructor(private readonly stateTransfer: StateTransferService,
              private readonly cache: CacheService) {
  }

  ngOnBootstrap = () => {
    this.stateTransfer.set(this.cache.key, JSON.stringify(this.cache.dehydrate()));
    this.stateTransfer.inject();
  }
}
