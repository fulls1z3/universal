import { isArray, isEmpty, isNil } from 'lodash/fp';

export const executeIfFunction = fn => (typeof fn === 'function' ? fn() : fn);

export const getOrNil =
  <T>(fallback: T | undefined = undefined) =>
  <X>(value?: X) =>
    isNil(value) || !value ? fallback : value;

export const getOrEmpty =
  <T>(fallback: Array<T> = []) =>
  <X>(value?: X) =>
    !(isArray(value) && !isEmpty(value)) ? fallback : value;

const switchCaseBase = cases => (defaultCase?) => key =>
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase;

export const switchCase = cases => (defaultCase?) => key => executeIfFunction(switchCaseBase(cases)(defaultCase)(key));
