// angular
import { Routes } from '@angular/router';

// libs
import { AuthGuard } from '@ngx-auth/core';

// components
import { SecureComponent } from './secure.component';

export const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    canActivate: [AuthGuard],
    data: {
      meta: {
        title: 'PUBLIC.SECURE.PAGE_TITLE',
        description: 'PUBLIC.SECURE.META_DESCRIPTION'
      }
    }
  }
];
