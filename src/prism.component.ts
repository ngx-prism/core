/// <reference path="./../typings/index.d.ts" />
// external
import { AfterViewChecked, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import Prism from 'prismjs';

/**
 * @export
 * @class PrismComponent
 * @implements {AfterViewChecked}
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'prism-highlight',
  templateUrl: './prism.component.html'
})
export class PrismComponent implements AfterViewChecked {
  _code: string;
  @Input('code') set code(value: string) {
    this._code = value;
  }
  get code(): string {
    return this._code;
  }
  @Input('async') public async = false;
  @Input('callback') public callback?: (element: Element) => void | undefined = undefined;
  @Input('language') public language: string;
  @ViewChild('codeElementRef') codeElementRef: ElementRef;

  ngAfterViewChecked() {
    this.highlight();
  }

  highlight(): void {
    if (this.code && this.codeElementRef) {
      this.codeElementRef.nativeElement.innerHTML = Prism.highlight(this.code, Prism.languages[this.language]);
    } else if (this.codeElementRef) {
      this.highlightElement(this.codeElementRef.nativeElement, this.async, this.callback);
    } else {
      this.highlightAll(this.async, this.callback);
    }
  }

  /**
   * Low-level function, only use if you know what you’re doing. It accepts a string of text as input and the
   * language definitions to use, and returns a string with the HTML produced.
   * @param {*} element
   * @param {boolean} async
   * @param {((element: Element) => void | undefined)} [callback]
   * @memberof PrismComponent
   */
  highlightElement(element: any, async: boolean, callback?: (element: Element) => void | undefined): void {
    Prism.highlightElement(element, async, callback);
  }

  /**
   * This is the most high-level function in Prism’s API. It fetches all the elements that have a .language-xxxx
   * class and then calls Prism.highlightElement() on each one of them.
   * @param {boolean} async
   * @param {((element: Element) => void | undefined)} [callback]
   * @memberof PrismComponent
   */
  highlightAll(async: boolean, callback?: (element: Element) => void | undefined): void {
    Prism.highlightAll(async, callback);
  }
}
