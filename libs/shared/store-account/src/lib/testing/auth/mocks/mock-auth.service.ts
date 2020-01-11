import { AuthService } from '@ngx-auth/core';
import { Observable, of as observableOf } from 'rxjs';

export class MockAuthService extends AuthService {
  isFailing: boolean;

  constructor() {
    const loader = { storage: localStorage } as any;
    super(loader, undefined, undefined);
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return observableOf(!this.isFailing);
  }

  invalidate(): any {
    return observableOf(true);
  }
}
