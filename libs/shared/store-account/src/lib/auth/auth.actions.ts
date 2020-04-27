import { ofType, unionize, UnionOf } from 'unionize';

import { Auth } from './auth.model';

export const authActions = unionize(
  {
    accountLogin: ofType<{ resource: Auth }>(),
    accountLoginSuccess: ofType<{}>(),
    accountLoginFail: ofType<string>(),
    accountLogout: ofType<{}>(),
    accountLogoutSuccess: {}
  },
  {
    tag: 'type',
    value: 'payload'
  }
);

export type AuthAction = UnionOf<typeof authActions>;
