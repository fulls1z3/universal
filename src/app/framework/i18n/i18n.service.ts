import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isEmpty } from 'lodash/fp';
import { Analytics, AnalyticsService } from '~/app/framework/analytics';
import { WindowService } from '~/app/framework/core';
import { Language } from '~/app/framework/store';

import { CATEGORY } from './models/category';

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
}
