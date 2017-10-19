/// <reference path="./../typings/index.d.ts" />
// external
import {
  ChangeDetectorRef,
  ElementRef,
  Input,
  Injectable,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as _ from 'lodash-es';

// internal
import { ComponentHoodClass } from './component-hood.class';
import { PrismInterface } from './prism.interface';
import { CallbackType } from './prism.type';
import { PrismService } from './prism.service';

/**
 * @export
 * @abstract
 * @class PrismHoodClass
 */
@Injectable()
export abstract class PrismHoodClass extends ComponentHoodClass implements PrismInterface {
  /**
   * Whether to or not to do highlight. If value is set to `true` then do highlight.
   * @protected
   * @memberof PrismHoodClass
   */
  protected change = false;

  /**
   * Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting very large chunks of code.
   * False by default (why? - http://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
   */
  @Input('async') public async = false;

  /**
   * An optional callback to be invoked after the highlighting is done.
   * Mostly useful when async is true, since in that case, the highlighting is done asynchronously.
   * @memberof PrismHoodClass
   */
  @Input('callback') public callback: CallbackType | undefined;

  /**
   * A string with the code to be highlighted.
   * @type {string}
   * @memberof PrismHoodClass
   */
  @Input('code') public code: string;

  /**
   * @type {Object}
   * @memberof PrismHoodClass
   */
  public _hooks: Object;
  @Input('hooks') set hooks(value: Object) {
    this._hooks = value;
    if (value instanceof Object) {
      _.forEach(value, (element, key) => {
        this.prismService.hooks().add(key, element);
      });
    }
  }
  get hooks(): Object {
    return this._hooks;
  }

  /**
   * Valid language identifier.
   * @type {string}
   * @memberof PrismHoodClass
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
   * @memberof PrismHoodClass
   */
  @Input('interpolation') public interpolation?: Object | undefined;

  /**
   * Creates an instance of PrismHoodClass.
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {PrismService} prismService
   * @memberof PrismHoodClass
   */
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public prismService: PrismService
  ) {
    super();
  }

  /**
   * @param {boolean} [change=false]
   * @memberof PrismHoodClass
   */
  highlightElement(change = false): void {
    if (this.change === change) {
      this.prismService.highlight(this.el, {
        async: this.async,
        callback: this.callback,
        code: this.code,
        interpolation: this.interpolation
      });
      this.change = false;
    }
  }
}
