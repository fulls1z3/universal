const executeIfFunction = (fn: any) =>
  typeof fn === 'function' ? fn() : fn;

function switchCaseBase(cases: any): (defaultCase?: any) => (key: any) => any {
  return (defaultCase?: any) => (key: any) =>
    cases.hasOwnProperty(key) ? cases[key] : defaultCase;
}

export function switchCase(cases: any): (defaultCase?: any) => (key: any) => any {
  return (defaultCase?: any) => (key: any) =>
    executeIfFunction(switchCaseBase(cases)(defaultCase)(key));
}
