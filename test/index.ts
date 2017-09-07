import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'rxjs/Rx';

import * as browser from '@angular/platform-browser-dynamic/testing';
import * as testing from '@angular/core/testing';

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
