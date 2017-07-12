/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with @types

 npm install @types/node
 npm install @types/lodash

 * If you can't find the type definition in the registry we can make an ambient/global definition in
 * this file for now. For example

 declare module 'my-module' {
 export function doesSomething(value: string): string;
 }

 * If you are using a CommonJS module that is using module.exports then you will have to write your
 * types using export = yourObjectOrFunction with a namespace above it
 * notice how we have to create a namespace that is equal to the function we're
 * assigning the export to

 declare module 'jwt-decode' {
 function jwtDecode(token: string): any;
 namespace jwtDecode {}
 export = jwtDecode;
 }

 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *

 declare var assert: any;
 declare var _: any;
 declare var $: any;

 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 * in the files such as main.browser.ts or any file within app/
 *

 import * as _ from 'lodash'

 * You can include your type definitions in this file until you create one for the @types
 *
 */

// support NodeJS modules without type definitions
declare module '*';

// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare const ENV: string;
declare const System: SystemJS;

interface SystemJS {
  import(path?: string): Promise<any>;
}

interface GlobalEnvironment {
  ENV: string;
  SystemJS: SystemJS;
  System: SystemJS;
}

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}
