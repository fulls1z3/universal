import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@ngx-auth/core';
import { ConfigService } from '@ngx-config/core';
import { Observable } from 'rxjs';

import { BaseComponent } from '../framework/core';
import { Language, LanguageSelectors, State } from '../store';

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

  constructor(private readonly store$: Store<State>, private readonly config: ConfigService, private readonly auth: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.title = 'APP_NAME';
    this.currentLanguage$ = this.store$.pipe(select(LanguageSelectors.getWorkingLanguage));
    this.availableLanguages = this.config.getSettings('i18n.availableLanguages');
    this.isAuthenticated = this.auth.isAuthenticated;
  }

  async logout(): Promise<boolean> {
    this.isAuthenticated = false;

    return this.auth.invalidate();
  }
}
