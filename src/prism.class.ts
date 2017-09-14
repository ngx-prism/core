/// <reference path="./../typings/index.d.ts" />
// external
import {
  ElementRef,
  Input,
  Injectable,
  ViewChild
} from '@angular/core';
import Prism from 'prismjs';

// internal
import { CallbackType } from './prism.type';

/**
 * @export
 * @abstract
 * @class PrismClass
 */
@Injectable()
export abstract class PrismClass {
  changed = false;

  /**
   * Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting very large chunks of code.
   * False by default (why? - http://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
   */
  @Input('async') public async = false;

  /**
   * An optional callback to be invoked after the highlighting is done.
   * Mostly useful when async is true, since in that case, the highlighting is done asynchronously.
   * @memberof PrismClass
   */
  @Input('callback') public callback?: CallbackType | undefined = undefined;

  /**
   * A string with the code to be highlighted.
   * @type {string}
   * @memberof PrismClass
   */
  _code: string;
  @Input('code') set code(value: string) {
    this._code = value;
  }
  get code(): string {
    return this._code;
  }

  /**
   * "The element containing the code. It must have a class of language-xxxx to be processed, where xxxx is a valid language identifier."
   * @type {ElementRef}
   * @memberof PrismClass
   */
  @ViewChild('codeElementRef') protected codeElementRef: ElementRef;

  /**
   * Valid language identifier.
   * @type {string}
   * @memberof PrismClass
   */
  @Input('language') public language: string;

  /**
   * Use highlight method depends on recevied boolean parameter `changed`.
   * @param {boolean} [changed=false]
   * @memberof PrismClass
   */
  highlight(changed = false): void {
    if (this.changed === changed) {
      if (this.codeElementRef) {
        if (this.code) {
          this.highlightCode();
        } else {
          this.highlightElement();
        }
        this.changed = false;
      }
    }
  }

  /**
   * Use `prismjs` to highlight string in property `code` and assign to nativeElement.
   * @memberof PrismClass
   */
  highlightCode(): void {
    if (typeof (this.code) === 'string' && typeof (this.language) === 'string') {
      this.codeElementRef.nativeElement.innerHTML = Prism.highlight(this.code, Prism.languages[this.language]);
    }
  }

  /**
   * Use `prismjs` to highlight code in nativeElement.
   * @memberof PrismClass
   */
  highlightElement(): void {
    Prism.highlightElement(this.codeElementRef.nativeElement, this.async, this.callback);
  }
}
