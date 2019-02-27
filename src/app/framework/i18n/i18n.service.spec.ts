import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsModule } from '~/app/framework/analytics';
import { WindowService } from '~/app/framework/core';
import { CoreTestingModule, MockWindowFrench, MockWindowNoLanguage } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { t } from '~/app/framework/testing';

import { I18NService } from './i18n.service';

const MOCK_DEFAULT_LANGUAGE = {
  code: 'en',
  name: 'English',
  culture: 'en-US'
};
const MOCK_AVAILABLE_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    culture: 'en-US'
  }
];

const testModuleConfig = (options?: any) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()).configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule.withOptions(options), I18NTestingModule, AnalyticsModule]
  });
};

t.describe('I18NService', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it(
    'should build without a problem',
    t.inject([I18NService], (instance: I18NService) => {
      t.e(instance).toBeTruthy();
    })
  );

  t.it(
    'should get language (by code)',
    t.inject([I18NService], (i18n: I18NService) => {
      i18n.availableLanguages = MOCK_AVAILABLE_LANGUAGES;

      const language = i18n.getLanguageByCode('en');

      t.e(language.code).toEqual('en');
    })
  );

  t.it(
    'should get default language (by code)',
    t.inject([I18NService], (i18n: I18NService) => {
      i18n.defaultLanguage = MOCK_DEFAULT_LANGUAGE;
      i18n.availableLanguages = MOCK_AVAILABLE_LANGUAGES;

      const language = i18n.getLanguageByCode('fr');

      t.e(language.code).toEqual('en');
    })
  );
});

t.describe('I18NService w/o init', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it(
    'should get `undefined` (by code)',
    t.inject([I18NService], (i18n: I18NService) => {
      const actual = i18n.getLanguageByCode('en');

      t.e(actual).toBeUndefined();
    })
  );
});

t.describe('I18NService for `server` platform', () => {
  t.be(() => {
    testModuleConfig({ platformId: 'server' });
  });

  t.it(
    'should support `english` by default',
    t.inject([I18NService], (i18n: I18NService) => {
      i18n.defaultLanguage = MOCK_DEFAULT_LANGUAGE;

      const actual = i18n.getLanguageCodeFromBrowser();

      t.e(actual).toEqual('en');
    })
  );
});

t.describe('I18NService for `fr` browser', () => {
  t.be(() => {
    testModuleConfig({ window: MockWindowFrench });
  });

  t.it(
    'should support `french` by default (window)',
    t.inject([WindowService], (win: WindowService) => {
      t.e(win.navigator.language).toEqual('fr-FR');
    })
  );

  t.it(
    'should support `french` by default',
    t.inject([I18NService, WindowService], (i18n: I18NService) => {
      const actual = i18n.getLanguageCodeFromBrowser();

      t.e(actual).toEqual('fr');
    })
  );
});

t.describe('I18NService for browser w/o language', () => {
  t.be(() => {
    testModuleConfig({ window: MockWindowNoLanguage });
  });

  t.it(
    'should support `english` by default (window)',
    t.inject([WindowService], (win: WindowService) => {
      t.e(win.navigator.language).toBeUndefined();
    })
  );

  t.it(
    'should support `english` by default',
    t.inject([I18NService], (i18n: I18NService) => {
      i18n.defaultLanguage = MOCK_DEFAULT_LANGUAGE;

      const actual = i18n.getLanguageCodeFromBrowser();

      t.e(actual).toEqual('en');
    })
  );
});
