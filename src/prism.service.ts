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

  private templateOptions = { interpolate: /{{([\s\S]+?)}}/g };

  constructor(private sanitizer: DomSanitizer) { }

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

  private interpolate(string: string, interpolation: Object): string {
    if (interpolation && typeof interpolation === 'object') {
      return _.template(string, this.templateOptions)(interpolation);
    }
    return string;
  }
}
