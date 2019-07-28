import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { flow, isEmpty } from 'lodash/fp';

import { getOrNil } from '../../shared';
import { Analytics, AnalyticsService } from '../analytics';
import { WindowService } from '../core';
import { Language } from '../store';

import { CATEGORY } from './models/category';

@Injectable()
export class I18NService extends Analytics {
  defaultLanguage: Language;
  availableLanguages: Array<Language>;
  useLocalizedRoutes: boolean;

  constructor(
    readonly analytics: AnalyticsService,
    private readonly win: WindowService,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) {
    super(analytics);

    this.category = CATEGORY;
  }

  getLanguageByCode(languageCode: string): Language {
    return !isEmpty(this.availableLanguages)
      ? flow(
        (cur: Array<Language>) => cur.find(language => language.code === languageCode),
        getOrNil(this.defaultLanguage)
      )(this.availableLanguages)
      : this.defaultLanguage;
  }

  getLanguageCodeFromBrowser(): string {
    return isPlatformBrowser(this.platformId)
      ? (this.win.navigator.language && this.win.navigator.language.split('-')[0]) || this.defaultLanguage.code
      : this.defaultLanguage.code;
  }
}
