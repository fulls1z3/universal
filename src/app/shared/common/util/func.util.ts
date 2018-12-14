const executeIfFunction = (fn: Function | any) =>
  typeof fn === 'function'
    ? fn()
    : fn;

const switchCaseBase = (cases: any) => (defaultCase?: any) => (key: any) => cases.hasOwnProperty(key)
  ? cases[key]
  : defaultCase;

export const switchCase = (cases: any) => (defaultCase?: any) => (key: any) => executeIfFunction(switchCaseBase(cases)(defaultCase)(key));
