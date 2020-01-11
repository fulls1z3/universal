import { inject, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { ConfigService } from '@ngx-config/core';

import { languageActions } from './language.actions';
import { reducer } from './language.reducer';
import { initialState } from './language.state';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [CoreTestingModule]
  });
};

describe('reducer', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should return the initial state', () => {
    const action = {} as any;
    const actual = reducer(undefined, action);

    expect(actual).toEqual(initialState);
  });

  describe('i18nUseLanguage', () => {
    test('should return the `isProcessing` on the state', inject([ConfigService], (config: ConfigService) => {
      const defaultLanguage = config.getSettings('i18n.defaultLanguage');
      const action = languageActions.i18nUseLanguage(defaultLanguage.code);
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    }));
  });

  describe('i18nUseLanguageSuccess', () => {
    test('should return the `selectedItem` on the state', inject([ConfigService], (config: ConfigService) => {
      const defaultLanguage = config.getSettings('i18n.defaultLanguage');
      const action = languageActions.i18nUseLanguageSuccess(defaultLanguage);
      const res = reducer(initialState, action);

      expect(res.selectedItem).toEqual(defaultLanguage);
    }));
  });
});
