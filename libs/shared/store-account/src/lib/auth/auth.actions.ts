import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';

import { Auth } from './auth.model';

export const authActions = unionize(
  {
    accountLogin: ofType<{ resource: Auth; router: Router }>(),
    accountLoginSuccess: ofType<{}>(),
    accountLoginFail: ofType<string>(),
    accountLogout: ofType<{ router?: Router }>(),
    accountLogoutSuccess: {}
  },
  {
    tag: 'type',
    value: 'payload'
  }
);

export type AuthAction = UnionOf<typeof authActions>;
