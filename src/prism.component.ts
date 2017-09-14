// external
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

// internal
import { PrismClass } from './prism.class';
import { CallbackType } from './prism.type';

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
export class PrismComponent extends PrismClass implements AfterViewChecked, AfterViewInit, OnChanges, OnInit {

  /**
   * ngAfterViewInit
   * Execute method `highlight()` once after view init and property `changed` is set to `false`.
   * @memberof PrismComponent
   */
  ngAfterViewInit() {
    this.highlight(false);
  }

  /**
   * After every view check execute method `highlight()` and set property `changed` to `false`.
   * @memberof PrismComponent
   */
  ngAfterViewChecked(): void {
    this.highlight(true);
  }

  /**
   * ngOnChanges
   * @param {SimpleChanges} changes
   * @memberof PrismComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.hasOwnProperty('code')) {
        if (changes.code.currentValue !== changes.code.previousValue) {
          this.changed = true;
        }
      }
      if (changes.hasOwnProperty('language')) {
        if (changes.language.currentValue !== changes.language.previousValue) {
          this.changed = true;
        }
      }
    }
  }

  /**
   * ngOnInit
   * Execute `highlight()` method if property `code` is assigned, and also property `changed` is set to `true`.
   * Highlighted string result is assigned to `codeElementRef` inner html.
   * @memberof PrismComponent
   */
  ngOnInit() {
    if (this.code && typeof (this.code) === 'string' && ( typeof (this.changed) === 'boolean' && this.changed === true)) {
      this.highlight(this.changed);
      if (this.callback) {
        this.callback(this.codeElementRef.nativeElement);
      }
    }
  }
}
