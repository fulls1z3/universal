import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@fulls1z3/shared/store';
import { languageActions } from '@fulls1z3/shared/store-i18n';
import { BaseComponent } from '@fulls1z3/shared/ui-base';
import { Store } from '@ngrx/store';
import { from as observableFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'i18n-change-language',
  template: ''
})
export class ChangeLanguageComponent extends BaseComponent implements OnInit {
  constructor(private readonly store$: Store<State>, private readonly route: ActivatedRoute, private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res.languageCode) {
        this.store$.dispatch(languageActions.i18nUseLanguage(res.languageCode));
      }

      observableFrom(this.router.navigate(['']))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {});
    });
  }
}
