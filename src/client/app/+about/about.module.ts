// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// libs
// import { I18NRouterModule } from '@ngx-i18n-router/core';

// routes & components
import { routes } from './about.routes';
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutApplePearComponent } from './about-apple-pear.component';

@NgModule({
  imports: [
    CommonModule,
    // I18NRouterModule.forChild(routes, 'about')
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent,
    AboutUsComponent,
    AboutBananaComponent,
    AboutApplePearComponent
  ]
})
export class AboutModule {
}
