// angular
import { Component, OnInit } from '@angular/core';

// libs
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';

// framework
import { getWorkingLanguage, Language } from '../../framework/i18n/i18n.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string;
  currentLanguage$: Observable<Language>;
  availableLanguages: Array<Language>;

  constructor(private readonly store: Store<Language>,
              private readonly config: ConfigService) {
  }

  ngOnInit(): void {
    this.title = 'APP_NAME';
    this.currentLanguage$ = this.store.select(getWorkingLanguage);
    this.availableLanguages = this.config.getSettings('i18n.availableLanguages');
  }
}
