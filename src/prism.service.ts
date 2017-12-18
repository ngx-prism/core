/// <reference path="./../typings/index.d.ts" />

// external
import { ElementRef, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import * as _ from 'lodash-es';

// internal
import { PrismInterface, OptionsInterface } from './prism.interface';
import { CallbackType } from './prism.type';

@Injectable()
export class PrismService {

  /**
   * Creates an instance of PrismService.
   * @param {DomSanitizer} sanitizer
   * @memberof PrismService
   */
  constructor(private sanitizer: DomSanitizer) { }

  /**
   * @param {ElementRef} el
   * @param {OptionsInterface} options
   * @memberof PrismService
   */
  public highlight(el: ElementRef, options: OptionsInterface): void {
    // Always need to have el.
    if (el instanceof ElementRef) {
      if (options.code) {
        el.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(options.code));
      }
      // Perform interpolate.
      if (options.interpolation) {
        el.nativeElement.innerHTML = this.interpolate(el.nativeElement.innerHTML, options.interpolation);
      }
      // Perform prism highlight code.
      Prism.highlightElement(el.nativeElement, options.async, options.callback);
    }
  }

  /**
   * @returns
   * @memberof PrismService
   */
  public hooks() {
    return Prism.hooks;
  }

  /**
   * @private
   * @param {string} unsafe
   * @returns
   * @memberof PrismService
   */
  private escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;');
  }

  /**
   * @private
   * @param {string} string
   * @param {Object} interpolation
   * @returns {string}
   * @memberof PrismService
   */
  private interpolate(string: string, interpolation: Object): string {
    if (interpolation && typeof interpolation === 'object') {

      // Use custom template delimiters.
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

      return _.template(string)(interpolation);
    }
    return string;
  }
}
