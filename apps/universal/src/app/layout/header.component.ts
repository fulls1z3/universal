import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@ngx-auth/core';
import { ConfigService } from '@ngx-config/core';
import { from as observableFrom, Observable } from 'rxjs';

import { BaseComponent } from '../framework/core';
import { Language, LanguageSelectors, State } from '../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent extends BaseComponent {
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

  constructor(private readonly store$: Store<State>, private readonly config: ConfigService, private readonly auth: AuthService) {
    super();
  }

  onLogoutClick(): void {
    this.isAuthenticated = false;

    observableFrom(this.auth.invalidate()).subscribe(() => {});
  }
}
