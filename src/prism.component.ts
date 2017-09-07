/// <reference path="../typings/index.d.ts" />
// external
import { AfterViewChecked, Component, Input, ViewEncapsulation } from '@angular/core';
import { default as Prism } from 'prismjs';

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
  @Input('async') private async = false;
  @Input('callback') private callback?: (element: Element) => void | undefined = undefined;
  @Input('language') language: string;

  ngAfterViewChecked() {
    this.highlightAll(this.async, this.callback);
  }

  /**
   * Low-level function, only use if you know what you’re doing. It accepts a string of text as input and the
   * language definitions to use, and returns a string with the HTML produced.
   * @param {*} element
   * @param {boolean} async
   * @param {((element: Element) => void | undefined)} [callback]
   * @memberof PrismComponent
   */
  highlightElement(element: any, async: boolean, callback?: (element: Element) => void | undefined) {
    Prism.highlightElement(element, async, callback);
  }

  /**
   * This is the most high-level function in Prism’s API. It fetches all the elements that have a .language-xxxx
   * class and then calls Prism.highlightElement() on each one of them.
   * @param {boolean} async
   * @param {((element: Element) => void | undefined)} [callback]
   * @memberof PrismComponent
   */
  highlightAll(async: boolean, callback?: (element: Element) => void | undefined) {
    Prism.highlightAll(async, callback);
  }
}
