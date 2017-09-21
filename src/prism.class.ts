/// <reference path="./../typings/index.d.ts" />
// external
import {
  ElementRef,
  Input,
  Injectable,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import Prism from 'prismjs';
import * as _ from 'lodash-es';

// internal
import { PrismInterface } from './prism.interface';
import { CallbackType } from './prism.type';

/**
 * @export
 * @abstract
 * @class PrismClass
 */
@Injectable()
export abstract class PrismClass implements PrismInterface {
  /**
   * Whether to or not to do highlight. If value is set to `true` then do highlight.
   * @protected
   * @memberof PrismClass
   */
  protected change = false;
  /**
   * If highlight has been done, then set its value to `true`.
   * @protected
   * @memberof PrismClass
   */
  protected changed = false;

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
  public _code: string;
  @Input('code') set code(value: string) {
    if (value) {
      if (typeof (value) === 'string') {
        this._code = value;
      } else {
        throw new Error(`Property \`code\` should be \`string\` instead of provided \`${typeof (value)}\``);
      }
    }
  }
  get code(): string {
    return this._code;
  }

  public codeHighlighted: string;
  public codeInterpolated: string;

  /**
   * Valid language identifier.
   * @type {string}
   * @memberof PrismClass
   */
  public _language: string;
  @Input('language') set language(value: string) {
    if (value) {
      if (typeof (value) === 'string') {
        this._language = value;
      } else {
        throw new Error(`Property \`language\` should be \`string\` instead of provided \`${typeof (value)}\``);
      }
    } else {
      throw new Error('Missing property `language`.');
    }
  };
  get language(): string {
    return this._language;
  }

  /**
   * Object properties to interpolate.
   * @type {(Object | undefined)}
   * @memberof PrismClass
   */
  @Input('interpolation') public interpolation: Object | undefined;

  /**
   * Interpolate with template options.
   * @private
   * @memberof PrismClass
   */
  private templateOptions = { interpolate: /{{([\s\S]+?)}}/g };

  /**
   * "The element containing the code. It must have a class of language-xxxx to be processed, where xxxx is a valid language identifier."
   * @type {ElementRef}
   * @memberof PrismClass
   */
  @ViewChild('codeElementRef') public codeElementRef: ElementRef;

  /**
   * Perform method depends on recevied boolean parameter `whenChangeIs`.
   * @protected
   * @param {boolean} [whenChangeIs=false]
   * @memberof PrismClass
   */
  protected highlight(whenChangeIs = false): void {
    if (this.change === whenChangeIs) {
      // Always need to have codeElementRef.
      if (this.codeElementRef && this.codeElementRef instanceof ElementRef) {

        // Perform interpolate.
        if (this.interpolation) {
          if (this.code) {
              this.interpolate(this.code);
            } else {
              this.codeElementRef.nativeElement.innerHTML = this.interpolate(this.codeElementRef.nativeElement.innerHTML);
          }
        }

        // Perform prism highlight code.
        if (this.code) {
          this.codeHighlighted = Prism.highlight((this.interpolation) ? this.codeInterpolated : this.code, Prism.languages[this.language]);
          this.codeElementRef.nativeElement.innerHTML = this.codeHighlighted;
        } else {
          Prism.highlightElement(this.codeElementRef.nativeElement, this.async, this.callback);
        }

        this.change = false;
        this.changed = true;
      }
    }
  }

  /**
   * Observe changes with specific `propertyName`. If found any, set property `change` to `true` and also store them.
   * @protected
   * @param {string} propertyName
   * @param {SimpleChanges} changes
   * @memberof PrismClass
   */
  protected onChanges(propertyName: string, changes: SimpleChanges): void {
    if (changes) {
      _.each(changes, (value: any, key: string) => {
        switch (key) {
          case propertyName:
            if (changes[key].currentValue !== changes[key].previousValue) {
              this.change = true; // changes has been found, set property `change` to `true`.
            }
          break;
        }
      });
    }
  }

  /**
   * @private
   * @param {string} string
   * @returns {string}
   * @memberof PrismClass
   */
  private interpolate(string: string): string {
    return this.codeInterpolated = _.template(string, this.templateOptions)(this.interpolation);
  }
}
