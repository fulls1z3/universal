import { AuthLoader, AuthService } from '@ngx-auth/core';
import { of } from 'rxjs';

export class MockAuthService extends AuthService {
  isFailing: boolean;

  constructor() {
    const loader = { storage: localStorage } as AuthLoader;
    super(loader, undefined, undefined);
  }

  authenticate() {
    return of(!this.isFailing);
  }

  invalidate() {
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
  }
}
