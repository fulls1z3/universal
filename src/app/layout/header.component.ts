// angular
import { Component, OnInit } from '@angular/core';

// libs
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
import { AuthService } from '@ngx-auth/core';

// framework
import { BaseComponent } from '~/app/framework/core';
import { Language } from '~/app/framework/i18n';

// state
import { LanguageSelectors } from '~/app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  title: string;
  currentLanguage$: Observable<Language>;
  availableLanguages: Array<Language>;
  isAuthenticated: boolean; // TODO: access only through getter

  constructor(private readonly store$: Store<Language>,
              private readonly config: ConfigService,
              private readonly auth: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.title = 'APP_NAME';
    this.currentLanguage$ = this.store$
      .pipe(select(LanguageSelectors.getWorkingLanguage));
    this.availableLanguages = this.config.getSettings('i18n.availableLanguages');
    this.isAuthenticated = this.auth.isAuthenticated;
  }

  trackByFn(index: any): any {
    return index;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.auth.invalidate();
  }
}
