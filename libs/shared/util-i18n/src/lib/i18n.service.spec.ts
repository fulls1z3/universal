import { inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsModule } from '@fulls1z3/shared/util-analytics';
import { WindowService } from '@fulls1z3/shared/util-core';
import { CoreTestingModule, MockWindowFrench, MockWindowNoLanguage } from '@fulls1z3/shared/util-core/testing';

import { I18NTestingModule } from '../testing';

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

describe('I18NService', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', inject([I18NService], (instance: I18NService) => {
    expect(instance).toBeTruthy();
  }));

  test('should get language (by code)', inject([I18NService], (i18n: I18NService) => {
    i18n.availableLanguages = MOCK_AVAILABLE_LANGUAGES;

    const language = i18n.getLanguageByCode('en');

    expect(language.code).toEqual('en');
  }));

  test('should get default language (by code)', inject([I18NService], (i18n: I18NService) => {
    i18n.defaultLanguage = MOCK_DEFAULT_LANGUAGE;
    i18n.availableLanguages = MOCK_AVAILABLE_LANGUAGES;

    const language = i18n.getLanguageByCode('fr');

    expect(language.code).toEqual('en');
  }));
});

describe('I18NService w/o init', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should get `undefined` (by code)', inject([I18NService], (i18n: I18NService) => {
    const actual = i18n.getLanguageByCode('en');

    expect(actual).toBeUndefined();
  }));
});

describe('I18NService for `server` platform', () => {
  beforeEach(() => {
    testModuleConfig({ platformId: 'server' });
  });

  test('should support `english` by default', inject([I18NService], (i18n: I18NService) => {
    i18n.defaultLanguage = MOCK_DEFAULT_LANGUAGE;

    const actual = i18n.getLanguageCodeFromBrowser();

    expect(actual).toEqual('en');
  }));
});

describe('I18NService for `fr` browser', () => {
  beforeEach(() => {
    testModuleConfig({ window: MockWindowFrench });
  });

  test('should support `french` by default (window)', inject([WindowService], (win: WindowService) => {
    expect(win.navigator.language).toEqual('fr-FR');
  }));

  test('should support `french` by default', inject([I18NService, WindowService], (i18n: I18NService) => {
    const actual = i18n.getLanguageCodeFromBrowser();

    expect(actual).toEqual('fr');
  }));
});

describe('I18NService for browser w/o language', () => {
  beforeEach(() => {
    testModuleConfig({ window: MockWindowNoLanguage });
  });

  test('should support `english` by default (window)', inject([WindowService], (win: WindowService) => {
    expect(win.navigator.language).toBeUndefined();
  }));

  test('should support `english` by default', inject([I18NService], (i18n: I18NService) => {
    i18n.defaultLanguage = MOCK_DEFAULT_LANGUAGE;

    const actual = i18n.getLanguageCodeFromBrowser();

    expect(actual).toEqual('en');
  }));
});
