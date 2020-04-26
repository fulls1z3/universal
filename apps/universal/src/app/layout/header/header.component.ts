import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '@fulls1z3/shared/store';
import { authActions } from '@fulls1z3/shared/store-account';
import { LanguageSelectors } from '@fulls1z3/shared/store-i18n';
import { BaseContainerComponent } from '@fulls1z3/shared/ui-store';
import { Language } from '@fulls1z3/shared/util-i18n';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@ngx-auth/core';
import { ConfigService } from '@ngx-config/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent extends BaseContainerComponent {
  isAuthenticated = this.auth.isAuthenticated;

  get title(): string {
    return 'APP_NAME';
  }

  get currentLanguage$(): Observable<Language> {
    return this.store$.pipe(select(LanguageSelectors.getWorkingLanguage));
  }

  get availableLanguages(): Array<Language> {
    return this.config.getSettings('i18n.availableLanguages');
  }

  constructor(
    private readonly router: Router,
    protected readonly store$: Store<State>,
    private readonly config: ConfigService,
    private readonly auth: AuthService
  ) {
    super(store$);
  }

  onLogoutClick(): void {
    this.isAuthenticated = false;

    this.store$.dispatch(authActions.accountLogout({ router: this.router }));
  }
}
