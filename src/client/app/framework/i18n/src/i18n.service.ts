// angular
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// libs
import { Observable, of as observableOf } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
// TODO: ngx-i18n-router
// import { I18NRouterService } from '@ngx-language-router/core';
import { TranslateService } from '@ngx-translate/core';

// framework
import { Analytics, AnalyticsService } from '~/app/framework/analytics/analytics.module';
import { WindowService } from '~/app/framework/core/core.module';

// module
import { CATEGORY } from './models/category';
import { I18NState } from './models/i18n-state';
import { initialLanguage, Language } from './models/language';
import { UseLanguage } from './language.actions';
import { getWorkingLanguage } from './reducers';

@Injectable()
export class I18NService extends Analytics {
  defaultLanguage: Language;
  availableLanguages: Array<Language>;
  useLocalizedRoutes: boolean;

  constructor(public analytics: AnalyticsService,
              private readonly store: Store<I18NState>,
              private readonly translate: TranslateService,
              // TODO: ngx-i18n-router
              // private readonly i18nRouter: I18NRouterService,
              private readonly injector: Injector,
              private readonly win: WindowService,
              @Inject(PLATFORM_ID) private readonly platformId: any) {
    super(analytics);

    this.category = CATEGORY;
    this.store
      .pipe(select(getWorkingLanguage))
      .subscribe(res => {
        if (res && res.code) {
          this.translate.use(res.code)
            .subscribe(() => {
              // set og:locale
              const meta = this.injector.get(MetaService);
              meta.setTag('og:locale', res.culture);
            });

          this.translate.use(res.code);

          // TODO: ngx-i18n-router
          // if (this.availableLanguages.length > 1)
          //   this.i18nRouter.useLanguage(state.code);
        }
      });
  }

  init(settings: any): Observable<Language> {
    this.defaultLanguage = settings.defaultLanguage;
    this.availableLanguages = settings.availableLanguages;
    this.useLocalizedRoutes = settings.useLocalizedRoutes;

    // add available languages & set default language
    this.translate.addLangs(this.availableLanguages
      .map(cur => cur.code));
    this.translate.setDefaultLang(this.defaultLanguage.code);

    // TODO: ngx-i18n-router
    // detect language from location/browser (if applicable)
    // let detectedLanguage;
    //
    // if (this.useLocalizedRoutes)
    //   detectedLanguage = this.getLanguageFromLocation();
    //
    // if (!detectedLanguage)
    const detectedLanguage = this.getLanguageFromBrowser();

    // TODO: ngx-i18n-router
    // this.i18nRouter.init(this.useLocalizedRoutes);

    // set og:locale
    const meta = this.injector.get(MetaService);
    meta.setTag('og:locale', this.defaultLanguage.culture);

    this.store.dispatch(new UseLanguage(detectedLanguage));

    return this.getLanguageByCode(detectedLanguage);
  }

  getLanguageByCode(languageCode: string): Observable<Language> {
    const defaultLanguage = {...(this.defaultLanguage || {
       ...initialLanguage,
       code: languageCode
     })};

    return observableOf(this.availableLanguages && Array.isArray(this.availableLanguages)
      ? this.availableLanguages.find(cur => cur.code === languageCode) || defaultLanguage
      : defaultLanguage);
  }

  private getLanguageFromBrowser(): string {
    return isPlatformBrowser(this.platformId)
      ? this.win.navigator.language && this.win.navigator.language.split('-')[0] || this.defaultLanguage.code
      : this.defaultLanguage.code;
  }

  // TODO: ngx-i18n-router
  // private getLanguageFromLocation(url?: string): string {
  //   let res;
  //
  //   if (isPlatformBrowser(this.platformId))
  //     if (this.useLocalizedRoutes) {
  //       const pathSlices = (url || location.pathname).split('/');
  //
  //       if (pathSlices.length > 1 && this.availableLanguages
  //           .map(cur => cur.code)
  //           .find(code => code === pathSlices[1]))
  //         res = pathSlices[1];
  //
  //       if (pathSlices.length && this.availableLanguages
  //           .map(cur => cur.code)
  //           .find(code => code === pathSlices[0]))
  //         res = pathSlices[0];
  //     }
  //
  //   return res || this.defaultLanguage.code;
  // }
}
