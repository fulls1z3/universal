import { isArray, isEmpty, isNil } from 'lodash/fp';

export const executeIfFunction = (fn: Function | any) => (typeof fn === 'function' ? fn() : fn);

export const getOrNil = <T>(fallback: T | undefined = undefined) => <X>(value?: X | any) => (isNil(value) || !value ? fallback : value);

export const getOrEmpty = <T>(fallback: Array<T> = []) => <X>(value?: X) => (!(isArray(value) && !isEmpty(value)) ? fallback : value);

const switchCaseBase = (cases: any) => (defaultCase?: any) => (key: any) => (cases.hasOwnProperty(key) ? cases[key] : defaultCase);

export const switchCase = (cases: any) => (defaultCase?: any) => (key: any) => executeIfFunction(switchCaseBase(cases)(defaultCase)(key));
