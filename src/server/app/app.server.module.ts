// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

// libs
import { ServerTransferStateModule, TransferState } from '@nglibs/universal-transfer-state';

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
    AppModule
  ]
})
export class AppServerModule {
  constructor(private readonly transferState: TransferState) {
  }

  ngOnBootstrap = () => {
    this.transferState.inject();
  }
}
