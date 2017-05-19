// import 'es6-shim';
// require('reflect-metadata');
import 'reflect-metadata';
// require('core-js/es6');
import 'core-js/es6';
// require('core-js/es7/reflect');
import 'core-js/es7/reflect';

// Typescript emit helpers polyfill
// require('ts-helpers');

// require('zone.js/dist/zone');
import 'zone.js/dist/zone';
// require('zone.js/dist/long-stack-trace-zone');
import 'zone.js/dist/long-stack-trace-zone';
// require('zone.js/dist/proxy'); // since zone.js 0.6.15
import 'zone.js/dist/proxy';
// require('zone.js/dist/sync-test');
import 'zone.js/dist/sync-test';
// require('zone.js/dist/jasmine-patch'); // put here since zone.js 0.6.14
import 'zone.js/dist/jasmine-patch';
// require('zone.js/dist/async-test');
import 'zone.js/dist/async-test';
// require('zone.js/dist/fake-async-test');
import 'zone.js/dist/fake-async-test';

// RxJS
// requirdeclare var __karma__: any;e('rxjs/Rx');
import 'rxjs/Rx';

// const browser = require('@angular/platform-browser-dynamic/testing');
import * as browser from '@angular/platform-browser-dynamic/testing';
// const testing = require('@angular/core/testing');
import * as testing from '@angular/core/testing';

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
