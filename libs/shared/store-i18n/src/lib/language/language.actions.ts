import { Language } from '@fulls1z3/shared/util-i18n';
import { ofType, unionize, UnionOf } from 'unionize';

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
