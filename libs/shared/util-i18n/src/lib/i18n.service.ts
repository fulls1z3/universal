import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Analytics, AnalyticsService } from '@fulls1z3/shared/util-analytics';
import { getOrNil, WindowService } from '@fulls1z3/shared/util-core';
import { flow, isEmpty } from 'lodash/fp';

import { CATEGORY } from './models/category';
import { Language } from './models/language';

@Injectable()
export class I18NService extends Analytics {
  defaultLanguage: Language;
  private _availableLanguages: Array<Language>;

  set availableLanguages(value: Array<Language>) {
    this._availableLanguages = value;
  }

  constructor(
    readonly analytics: AnalyticsService,
    private readonly win: WindowService,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
    super(analytics, CATEGORY);
  }

  getLanguageByCode(languageCode: string): Language {
    return !isEmpty(this._availableLanguages)
      ? flow(
          (cur: Array<Language>) => cur.find(language => language.code === languageCode),
          getOrNil(this.defaultLanguage)
        )(this._availableLanguages)
      : this.defaultLanguage;
  }

  getLanguageCodeFromBrowser(): string {
    return isPlatformBrowser(this.platformId)
      ? (this.win.navigator.language && this.win.navigator.language.split('-')[0]) || this.defaultLanguage.code
      : this.defaultLanguage.code;
  }
}
