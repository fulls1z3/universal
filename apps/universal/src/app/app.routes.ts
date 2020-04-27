import { ChangeLanguageComponent } from '@fulls1z3/shared/ui-i18n';
import { MetaGuard } from '@ngx-meta/core';

import { MainComponent } from './layout/main.component';
import { LoginComponent } from './login/login.component';

export const routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'LOGIN.PAGE_TITLE'
      }
    }
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./+home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./+about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'air-universal',
        loadChildren: () => import('./+air-universal/air-universal.module').then(m => m.AirUniversalModule)
      },
      {
        path: 'secure-page',
        loadChildren: () => import('./+secure/secure.module').then(m => m.SecureModule)
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
