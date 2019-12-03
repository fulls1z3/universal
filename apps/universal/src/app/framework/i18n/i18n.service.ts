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
  private _availableLanguages: Array<Language>;
  private _useLocalizedRoutes: boolean;

  set availableLanguages(value: Array<Language>) {
    this._availableLanguages = value;
  }

  set useLocalizedRoutes(value: boolean) {
    this._useLocalizedRoutes = value;
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
