// libs
import { Action } from '@ngrx/store';

// module
import { Language } from './models/language';

export const enum LanguageAction {
  INIT = '[Language] INIT',
  USE_LANGUAGE = '[Language] USE_LANGUAGE',
  USE_LANGUAGE_SUCCESS = '[Language] USE_LANGUAGE success',
  USE_LANGUAGE_UNSUPPORTED = '[Language] USE_LANGUAGE unsupported'
}

export class Init implements Action {
  readonly type: string;

  constructor(public payload: any) {
    this.type = LanguageAction.INIT;
  }
}

export class UseLanguage implements Action {
  readonly type: string;

  constructor(public payload: string) {
    this.type = LanguageAction.USE_LANGUAGE;
  }
}

export class UseLanguageSuccess implements Action {
  readonly type: string;

  constructor(public payload: Language) {
    this.type = LanguageAction.USE_LANGUAGE_SUCCESS;
  }
}

export class UseLanguageUnsupported implements Action {
  readonly type: string;

  constructor(public payload: string) {
    this.type = LanguageAction.USE_LANGUAGE_UNSUPPORTED;
  }
}

export type Actions =
  | Init
  | UseLanguage
  | UseLanguageSuccess
  | UseLanguageUnsupported;
