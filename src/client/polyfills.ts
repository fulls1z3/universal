/**
 * IE9, IE10 and IE11 requires all of the following polyfills.
 */
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/weak-set';
// import 'core-js/es6/typed';

/**
 * IE10 and IE11 requires the following for NgClass support on SVG elements
 */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * IE10 and IE11 requires the following for the Reflect API.
 */
// import 'core-js/es6/reflect';

/**
 * Evergreen browsers require these.
 */
import 'core-js/es7/reflect';

/**
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';

if (process.env.NODE_ENV !== 'production') {
  Error['stackTraceLimit'] = Infinity;
  // tslint:disable-next-line
  require('zone.js/dist/long-stack-trace-zone');
}
