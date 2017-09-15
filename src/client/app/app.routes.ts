// angular
import { Routes } from '@angular/router';

// libs
import { MetaGuard } from '@ngx-meta/core';

// components
import { LoginComponent } from './components/login';
import { MainComponent } from './components/layout';
import { ChangeLanguageComponent } from './framework/i18n/i18n.module';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'PUBLIC.LOGIN.PAGE_TITLE'
      }
    }
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './components/+home/home.module#HomeModule'
      },
      {
        path: 'about',
        loadChildren: './components/+about/about.module#AboutModule'
      },
      {
        path: 'secure-page',
        loadChildren: './components/+secure/secure.module#SecureModule'
      }
    ],
    canActivateChild: [MetaGuard],
    data: {
      i18n: {
        isRoot: true
      }
    }
  },
  {
    path: 'change-language/:languageCode',
    component: ChangeLanguageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
