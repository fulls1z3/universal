// libs
import { ofType, unionize, UnionOf } from 'unionize';

// module
import { Language } from './language.model';

export const languageActions = unionize({
  init: ofType<any>(),
  use: ofType<string>(),
  useSuccess: ofType<Language>(),
  useFail: ofType<string>()
}, {
  tag: 'type',
  value: 'payload'
});

export type LanguageAction = UnionOf<typeof languageActions>;
