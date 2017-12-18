/// <reference path="./../typings/index.d.ts" />

// external
import {
  ChangeDetectorRef,
  ElementRef,
  Input,
  Injectable,
  ViewChild
} from '@angular/core';
import * as _ from 'lodash-es';

// internal
import { PrismInterface } from './prism.interface';
import { CallbackType } from './prism.type';
import { PrismService } from './prism.service';

/**
 * @export
 * @abstract
 * @class PrismHoodClass
 */
@Injectable()
export abstract class PrismHoodClass implements PrismInterface {
  @ViewChild('el', { read: ElementRef }) el: ElementRef;

  ready = false;

  __properties: any;

  _cd: any;
  @Input('cd')
  set cd(cd: any) {
    this._cd = cd;
    if (this.ready === true) {
      this.__properties = cd;
    }
  }
  get cd() {
    return this._cd;
  }

  /**
   * Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting very large chunks of code.
   * False by default (why? - http://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
   */
  public _async = false;
  @Input('async')
  set async(async: boolean) {
    this._async = async;
  }
  get async(): boolean {
    return this._async;
  }

  /**
   * An optional callback to be invoked after the highlighting is done.
   * Mostly useful when async is true, since in that case, the highlighting is done asynchronously.
   * @memberof PrismHoodClass
   */
  public _callback: CallbackType | undefined;
  @Input('callback')
  set callback(callback: CallbackType | undefined) {
    this._callback = callback;
  }
  get callback(): CallbackType | undefined {
    return this._callback;
  }

  /**
   * A string with the code to be highlighted.
   * @type {string}
   * @memberof PrismHoodClass
   */
  public _code: string;
  @Input('code')
  set code(code: string) {
    this._code = code;
    if (this.ready) {
      if (this.__properties.code === true) {
        this.highlightElement({ code, language: this.language });
      }
    }
  }
  get code(): string {
    return this._code;
  }

  /**
   * @type {Object}
   * @memberof PrismHoodClass
   */
  public _hooks: Object;
  @Input('hooks')
  set hooks(hooks: Object) {
    this._hooks = hooks;
    if (hooks instanceof Object) {
      _.forEach(hooks, (element: any, key: string) => {
        this.prismService.hooks().add(key, element);
      });
    }
    this.highlightElement({ code: this.code, language: this.language });
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
  @Input('language') set language(language: string) {
    if (language) {
      if (typeof (language) === 'string') {
        this._language = language;
        this.highlightElement({ code: this.code, language });
      } else {
        throw new Error(`Property \`language\` should be \`string\` instead of provided \`${typeof (language)}\``);
      }
    } else {
      throw new Error('Missing property `language`.');
    }
  }
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
  ) {}

  /**
   * @param {{code: string, language: string}} result
   * @memberof PrismHoodClass
   */
  highlightElement(result: { code: string, language: string }): void {
    if (this.ready === true) {
      this.prismService.highlight(this.el, {
        async: this.async,
        callback: this.callback,
        code: result.code,
        interpolation: this.interpolation
      });
    }
  }
}
