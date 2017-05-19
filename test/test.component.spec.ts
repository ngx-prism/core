
// external
import { NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { TestComponent } from './test.component';
import { TestModule } from './test.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('TestComponent', () => {

  let comp: TestComponent;
  let debugElement: any;
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should be defined', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  it('should have prism-highlight html tag', async(() => {
    expect(nativeElement.querySelector('prism-highlight')).toBeTruthy();
  }));
  it('should have `language` property defined', async(() => {
    expect(comp.language).toBe('html');
  }));
  it('should have `async` property default value as false', async(() => {
  }));
  it('should have `html` property defined', async(() => {
    // console.info(debugElement.nativeElement);
    // console.info(`test:`, nativeElement.querySelector('code').innerText);
    // fixture.detectChanges();
    // console.info(nativeElement);
  }));
  it('should have div container', async(() => {
    // expect(nativeElement.querySelector('div')).not.toBeNull();
    // expect(debugElement.query(By.css('div'))).not.toBeNull();
  }));
});