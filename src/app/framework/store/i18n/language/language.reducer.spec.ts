import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@ngx-config/core';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';

import { languageActions } from './language.actions';
import { reducer } from './language.reducer';
import { initialState } from './language.state';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [CoreTestingModule]
  });
};

t.describe('reducer', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it('should return the initial state', () => {
    const action = {} as any;
    const actual = reducer(undefined, action);

    t.e(actual).toEqual(initialState);
  });

  t.describe('i18nUseLanguage', () => {
    t.it(
      'should return the `isProcessing` on the state',
      t.inject([ConfigService], (config: ConfigService) => {
        const defaultLanguage = config.getSettings('i18n.defaultLanguage');
        const action = languageActions.i18nUseLanguage(defaultLanguage.code);
        const res = reducer(initialState, action);

        t.e(res.isProcessing).toBeTruthy();
      })
    );
  });

  t.describe('i18nUseLanguageSuccess', () => {
    t.it(
      'should return the `selectedItem` on the state',
      t.inject([ConfigService], (config: ConfigService) => {
        const defaultLanguage = config.getSettings('i18n.defaultLanguage');
        const action = languageActions.i18nUseLanguageSuccess(defaultLanguage);
        const res = reducer(initialState, action);

        t.e(res.selectedItem).toEqual(defaultLanguage);
      })
    );
  });
});
