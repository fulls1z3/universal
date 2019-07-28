import { AuthGuard } from '@ngx-auth/core';

import { SecureComponent } from './secure.component';

export const routes = [
  {
    path: '',
    component: SecureComponent,
    canActivate: [AuthGuard],
    data: {
      meta: {
        title: 'SECURE.PAGE_TITLE',
        description: 'SECURE.META_DESCRIPTION'
      }
    }
  }
];
