import 'core-js/es6';
import 'reflect-metadata';
import 'angular2-in-memory-web-api';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
} else {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
