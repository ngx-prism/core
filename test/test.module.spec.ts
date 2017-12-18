// external
import { DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
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
  let debugElement: DebugElement;
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
  it('should have `ngx-prism` html tag', async(() => {
    expect(nativeElement.querySelector('ngx-prism')).toBeTruthy();
  }));
  it('should have `language` property defined', async(() => {
    expect(comp.language).toBe('html');
  }));

  // ng-content
  it('it should have `ng-content` highlighted and interpolated.', () => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-prism[id="ng-content"]').innerHTML).toContain(comp.text);
  });
  it('should have component `ng-content` changed.', async(() => {
    comp.code.content = `<p align="left">{{interpolated}}</p>`;
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-prism[id="ng-content"]').innerHTML).toContain(`left`);
  }));

  // Test `code` property.
  it('should have component property `code` with css working.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-prism[id="code-css"]').innerText).toContain(`text-align`);
  }));
  it('should have component property `code` with html working.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-prism[id="code-html"]').innerText).toContain(`My p`);
  }));
  it('should have component property `code` with html and interpolation working.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-prism[id="code-interpolation"]').innerText).toContain(comp.text);
  }));
  it('should have component property `code` with html and interpolation working.', async(() => {
    comp.language = 'javascript';
    comp.code.html = `<p align="center" style="">My p {{language}}</p>`;
    fixture.detectChanges();
    expect(nativeElement.querySelector(`code[class~="language-${comp.language}"]`)).toBeTruthy();
    expect(nativeElement.querySelector('ngx-prism[id~="code-interpolation"]').innerText).toContain(`My p ${comp.language}`);
  }));

});
