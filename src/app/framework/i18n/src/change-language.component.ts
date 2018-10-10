// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// module
import { Language } from './models/language';
import { UseLanguage } from './language.actions';

@Component({
  selector: 'i18n-change-language',
  template: ''
})
export class ChangeLanguageComponent extends BaseComponent implements OnInit {
  constructor(private readonly store: Store<Language>,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res.languageCode)
          this.store.dispatch(new UseLanguage(res.languageCode));

        this.router.navigate(['']);
      });
  }
}
