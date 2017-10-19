// external
import {
  ElementRef,
  Injectable,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash-es';

// internal
import { CallbackOnChangesType } from './prism.type';

/**
 * @export
 * @abstract
 * @class ComponentHoodClass
 */
@Injectable()
export abstract class ComponentHoodClass {

  @ViewChild('el', { read: ElementRef }) el: ElementRef;

  /**
   * Observe changes with specific `prop` parameter. If found, set `this` property `change` to `true`
   * @protected
   * @param {(string | string[])} prop
   * @param {SimpleChanges} changes
   * @param {CallbackOnChangesType} [callback]
   * @memberof ComponentHoodClass
   */
  protected onChanges(prop: string | string[], changes: SimpleChanges, callback?: CallbackOnChangesType): void {
    if (changes) {
      _.each(changes, (value: any, key: string) => {
        if (prop instanceof Array) {
          _.each(prop, (propName) => {
            if (key === propName) {
              if (changes[key].currentValue !== changes[key].previousValue) {
                if (callback) {
                  callback(changes);
                }
              }
            }
          });
        } else {
          switch (key) {
            case prop:
              if (changes[key].currentValue !== changes[key].previousValue) {
                if (callback) {
                  callback(changes);
                }
              }
            break;
          }
        }
      });
    }
  }
}
