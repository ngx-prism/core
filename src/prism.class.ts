/// <reference path="./../typings/index.d.ts" />
// external
import {
  ElementRef,
  Input,
  Injectable,
  SimpleChanges,
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
 * @class PrismClass
 */
@Injectable()
export abstract class PrismClass implements PrismInterface {
  /**
   * Whether to or not to do highlight. If value is set to `true` then do highlight.
   * @protected
   * @memberof PrismClass
   */
  protected _change = false;
  set change(value: boolean) {
    this._change = value;
  }
  get change(): boolean {
    return this._change;
  }

  /**
   * Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting very large chunks of code.
   * False by default (why? - http://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
   */
  public _async = false;
  @Input('async') set async(value: boolean) {
    this._async = value;
  }
  get async(): boolean {
    return this._async;
  }

  /**
   * An optional callback to be invoked after the highlighting is done.
   * Mostly useful when async is true, since in that case, the highlighting is done asynchronously.
   * @memberof PrismClass
   */
  public _callback?: CallbackType;
  @Input('callback') set callback(value: CallbackType | undefined) {
    this._callback = value;
  }
  get callback(): CallbackType | undefined {
    return this._callback;
  }

  /**
   * A string with the code to be highlighted.
   * @type {string}
   * @memberof PrismClass
   */
  public _code: string;
  @Input('code') set code(value: string) {
    this._code = value;
  }
  get code(): string {
    return this._code;
  }

  /**
   * @type {Object}
   * @memberof PrismClass
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
  public _interpolation?: Object | undefined;
  @Input('interpolation') set interpolation(value: Object | undefined) {
    this._interpolation = value;
  }
  get interpolation(): Object | undefined {
    return this._interpolation;
  }

  /**
   * "The element containing the code. It must have a class of language-xxxx to be processed, where xxxx is a valid language identifier."
   * @type {ElementRef}
   * @memberof PrismClass
   */
  @ViewChild('codeElementRef') public codeElementRef: ElementRef;

  constructor(public prismService: PrismService) { }

  /**
   * Observe changes with specific `prop`. If found any, set property `change` to `true`.
   * @protected
   * @param {string} prop
   * @param {SimpleChanges} changes
   * @memberof PrismClass
   */
  protected onChanges(prop: string | string[], changes: SimpleChanges): void {
    if (changes) {
      _.each(changes, (value: any, key: string) => {
        if (prop instanceof Array) {
          _.each(prop, (propName) => {
            if (key === propName) {
              if (changes[key].currentValue !== changes[key].previousValue) {
                this.change = true; // changes has been found, set property `change` to `true`.
              }
            }
          });
        } else {
          switch (key) {
            case prop:
              if (changes[key].currentValue !== changes[key].previousValue) {
                this.change = true; // changes has been found, set property `change` to `true`.
              }
            break;
          }
        }
      });
    }
  }
}
