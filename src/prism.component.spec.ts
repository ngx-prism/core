
// external
import { NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { PrismComponent } from './prism.component';
import { PrismModule } from './prism.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('PrismComponent', () => {

  let comp: PrismComponent;
  let debugElement: any;
  let fixture: ComponentFixture<PrismComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PrismModule]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(PrismComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });
  it('should be defined', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  it('should havent pre html ', async(() => {
    expect(nativeElement.querySelector('pre')).toBeNull();
  }));
  it('should have pre html ', async(() => {
    comp.language = 'html';
    fixture.detectChanges();
    expect(nativeElement.querySelector('pre')).toBeTruthy();
  }));
  it('should have pre > code html ', async(() => {
    comp.language = 'html';
    fixture.detectChanges();
    expect(nativeElement.querySelector('pre > code')).toBeTruthy();
  }));
  it('should have class language-html defined ', async(() => {
    comp.language = 'html';
    fixture.detectChanges();
    expect(nativeElement.querySelector('code[class*="language-html"]')).toBeTruthy();
  }));
});
