// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// libs
import { TransferHttpModule } from '@nglibs/universal-transfer-state';

// framework
import { CoreModule, configFactory, i18nRouterFactory, metaFactory } from './framework/core/core.module';

// routes & components
import { routes } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    TransferHttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
