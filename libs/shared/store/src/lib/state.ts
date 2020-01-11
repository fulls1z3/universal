import { AccountState } from '@fulls1z3/shared/store-account';
import { AirUniversalState } from '@fulls1z3/shared/store-air-universal';
import { I18NState } from '@fulls1z3/shared/store-i18n';

export interface State {
  account: AccountState;
  airUniversal: AirUniversalState;
  i18n: I18NState;
}
