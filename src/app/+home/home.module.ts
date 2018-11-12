// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// libs
// TODO: ngx-i18n-router
// import { I18NRouterModule } from '@ngx-i18n-router/core';

// app
import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

// module
import { HomeComponent } from './home.component';
import { routes } from './home.routes';

@NgModule({
  imports: [
    CommonModule,
    // TODO: ngx-i18n-router
    // I18NRouterModule.forChild(routes, 'home')
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
