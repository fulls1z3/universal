import { isNil } from 'lodash/fp';

const executeIfFunction = (fn: Function | any) =>
  typeof fn === 'function'
    ? fn()
    : fn;

export const getOrNil = <T>(fallback: T) =>
  <X>(value?: X) =>
    isNil(value)
      ? fallback
      : value;

const switchCaseBase = (cases: any) =>
  (defaultCase?: any) =>
    (key: any) =>
      cases.hasOwnProperty(key)
        ? cases[key]
        : defaultCase;

export const switchCase = (cases: any) =>
  (defaultCase?: any) =>
    (key: any) =>
      executeIfFunction(switchCaseBase(cases)(defaultCase)(key));
