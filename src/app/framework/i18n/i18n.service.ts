// angular
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// libs
import { isEmpty } from 'lodash/fp';

// app
import { Analytics, AnalyticsService } from '~/app/framework/analytics';
import { WindowService } from '~/app/framework/core';

// module
import { CATEGORY } from './models/category';
import { Language } from './models/language';

@Injectable()
export class I18NService extends Analytics {
  defaultLanguage: Language;
  availableLanguages: Array<Language>;
  useLocalizedRoutes: boolean;

  constructor(readonly analytics: AnalyticsService,
              private readonly win: WindowService,
              @Inject(PLATFORM_ID) private readonly platformId: any) {
    super(analytics);

    this.category = CATEGORY;
  }

  getLanguageByCode(languageCode: string): Language {
    return !isEmpty(this.availableLanguages)
      ? this.availableLanguages
      .find(cur => cur.code === languageCode) || this.defaultLanguage
      : this.defaultLanguage;
  }

  getLanguageCodeFromBrowser(): string {
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
