// external
import { ElementRef, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import * as _ from 'lodash-es';

// internal
import { PrismInterface } from './prism.interface';
import { CallbackType } from './prism.type';

@Injectable()
export class PrismService {

  private prism = Prism;
  private templateOptions = { interpolate: /{{([\s\S]+?)}}/g };

  constructor(private sanitizer: DomSanitizer) { }

  public highlight(codeElementRef: ElementRef, options: {
    async: boolean, callback?: CallbackType, code?: string, interpolation?: Object
  }): void {
    // Always need to have codeElementRef.
    if (codeElementRef instanceof ElementRef) {
      if (options.code !== undefined) {
        codeElementRef.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(options.code));
      }

      // Perform interpolate.
      if (options.interpolation) {
        this.interpolate(codeElementRef, options.interpolation);
      }

      // Perform prism highlight code.
      this.prism.highlightElement(codeElementRef.nativeElement, options.async, options.callback);
    }
  }

  /**
   * @returns
   * @memberof PrismService
   */
  public hooks() {
    return this.prism.hooks;
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

  private interpolate(elementRef: ElementRef, interpolation: Object): string {
    if (interpolation && typeof interpolation === 'object') {
      return elementRef.nativeElement.innerHTML = _.template(elementRef.nativeElement.innerHTML, this.templateOptions)(interpolation);
    }
    return elementRef.nativeElement.innerHTML;
  }
}
