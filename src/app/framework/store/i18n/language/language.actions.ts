import { ofType, unionize, UnionOf } from 'unionize';

import { Language } from './language.model';

export const languageActions = unionize(
  {
    i18nInitLanguage: ofType<any>(),
    i18nUseLanguage: ofType<string>(),
    i18nUseLanguageSuccess: ofType<Language>(),
    i18nUseLanguageFail: ofType<string>()
  },
  {
    tag: 'type',
    value: 'payload'
  }
);

export type LanguageAction = UnionOf<typeof languageActions>;
