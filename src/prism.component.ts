// external
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
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
export class PrismComponent extends PrismClass implements AfterViewChecked, OnChanges {
  /**
   * Every check perform method `highlight()` and set property value `change` to `false`.
   * It won't happened when property `code` is used, because property `change` is set to false in earlier hook.
   * @memberof PrismComponent
   */
  ngAfterViewChecked(): void {
    this.highlight(true);
    this.changed = false;
  }

  /**
   * @param {SimpleChanges} changes
   * @memberof PrismComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges('language', changes);
    this.onChanges('code', changes);

    if (this.code) {
      this.highlight(true);
      if (this.callback && this.codeElementRef) {
        this.callback(this.codeElementRef.nativeElement);
      }
    }
  }
}
