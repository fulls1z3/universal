// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdCardModule } from '@angular/material';

// libs
// TODO: ngx-i18n-router
// import { I18NRouterModule } from '@ngx-i18n-router/core';

// framework
import { SharedModule } from '../../framework/core/shared.module';

// routes & components
import { routes } from './secure.routes';
import { SecureComponent } from './secure.component';

@NgModule({
  imports: [
    CommonModule,
    // TODO: ngx-i18n-router
    // I18NRouterModule.forChild(routes, 'home')
    RouterModule.forChild(routes),
    MdCardModule,
    SharedModule
  ],
  declarations: [SecureComponent]
})
export class SecureModule {
}
