// angular
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

// testing
import { CoreTestingModule, MockWindowFrench, MockWindowNoLanguage } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { t } from '~/app/framework/testing';

// app
import { AnalyticsModule } from '~/app/framework/analytics';
import { WindowService } from '~/app/framework/core';

// module
import { I18NService } from './i18n.service';

const mockDefaultLanguage = {
  code: 'en',
  name: 'English',
  culture: 'en-US'
};
const mockAvailableLanguages = [
  {
    code: 'en',
    name: 'English',
    culture: 'en-US'
  }
];

const testModuleConfig = (options?: any) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreTestingModule.withOptions(options),
        I18NTestingModule,
        AnalyticsModule
      ]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('i18n: I18NService', () => {
      t.be(() => testModuleConfig());

      t.it('should build without a problem',
        t.inject([I18NService], (i18n: I18NService) => {
          t.e(i18n)
            .toBeTruthy();
        }));

      t.it('should get language (by code)',
        t.inject([I18NService], (i18n: I18NService) => {
          i18n.availableLanguages = mockAvailableLanguages;

          const language = i18n.getLanguageByCode('en');

          t.e(language.code)
            .toBe('en');
        }));

      t.it('should get default language (by code)',
        t.inject([I18NService], (i18n: I18NService) => {
          i18n.defaultLanguage = mockDefaultLanguage;
          i18n.availableLanguages = mockAvailableLanguages;

          const language = i18n.getLanguageByCode('fr');

          t.e(language.code)
            .toBe('en');
        }));
    });

    t.describe('i18n: I18NService w/o init', () => {
      t.be(() => testModuleConfig());

      t.it('should get `undefined` (by code)',
        t.inject([I18NService], (i18n: I18NService) => {
          const language = i18n.getLanguageByCode('en');

          t.e(language)
            .toBeUndefined();
        }));
    });

    t.describe('i18n: I18NService for `server` platform', () => {
      t.be(() => testModuleConfig({platformId: 'server'}));

      t.it('should support `english` by default',
        t.inject([I18NService], (i18n: I18NService) => {
          i18n.defaultLanguage = mockDefaultLanguage;

          const languageCode = i18n.getLanguageCodeFromBrowser();

          t.e(languageCode)
            .toBe('en');
        }));
    });

    t.describe('i18n: I18NService for `fr` browser', () => {
      t.be(() => testModuleConfig({window: MockWindowFrench}));

      t.it('should support `french` by default',
        t.inject([I18NService, WindowService],
          (i18n: I18NService, win: WindowService) => {
            const languageCode = i18n.getLanguageCodeFromBrowser();

            t.e(win.navigator.language)
              .toBe('fr-FR');
            t.e(languageCode)
              .toBe('fr');
          }));
    });

    t.describe('i18n: I18NService for browser w/o language', () => {
      t.be(() => testModuleConfig({window: MockWindowNoLanguage}));

      t.it('should support `english` by default',
        t.inject([I18NService, WindowService],
          (i18n: I18NService, win: WindowService) => {
            i18n.defaultLanguage = mockDefaultLanguage;

            const languageCode = i18n.getLanguageCodeFromBrowser();

            t.e(win.navigator.language)
              .toBeUndefined();
            t.e(languageCode)
              .toBe('en');
          }));
    });
  });
});
