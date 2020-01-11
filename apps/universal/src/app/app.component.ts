import { Component, OnInit } from '@angular/core';
import { State } from '@fulls1z3/shared/store';
import { languageActions } from '@fulls1z3/shared/store-i18n';
import { BaseContainerComponent } from '@fulls1z3/shared/ui-store';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseContainerComponent implements OnInit {
  constructor(protected readonly store$: Store<State>, private readonly config: ConfigService) {
    super(store$);
  }

  ngOnInit(): void {
    const settings = this.config.getSettings('i18n');
    this.store$.dispatch(languageActions.i18nInitLanguage(settings));
  }
}
