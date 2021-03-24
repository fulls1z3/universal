import { Component } from '@angular/core';
import { State } from '@fulls1z3/shared/store';
import { authActions } from '@fulls1z3/shared/store-account';
import { BaseContainerComponent } from '@fulls1z3/shared/ui-store';
import { Store } from '@ngrx/store';
import { AuthService } from '@ngx-auth/core';
import { ConfigService } from '@ngx-config/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent extends BaseContainerComponent {
  isAuthenticated = this.auth.isAuthenticated;

  get title() {
    return 'APP_NAME';
  }

  get availableLanguages() {
    return this.config.getSettings('i18n.availableLanguages');
  }

  constructor(
    protected readonly store$: Store<State>,
    private readonly config: ConfigService,
    private readonly auth: AuthService
  ) {
    super(store$);
  }

  onLogoutClick() {
    this.isAuthenticated = false;

    this.store$.dispatch(authActions.accountLogout());
  }
}
