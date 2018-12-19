import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from as observableFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '~/app/framework/core';
import { FrameworkState, languageActions } from '~/app/framework/store';

@Component({
  selector: 'i18n-change-language',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeLanguageComponent extends BaseComponent implements OnInit {
  constructor(private readonly store$: Store<FrameworkState>, private readonly route: ActivatedRoute, private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res.languageCode) {
        this.store$.dispatch(languageActions.i18nUseLanguage(res.languageCode));
      }

      observableFrom(this.router.navigate(['']))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          /**/
        });
    });
  }
}
