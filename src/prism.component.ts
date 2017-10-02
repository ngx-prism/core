// external
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import Prism from 'prismjs';

// internal
import { PrismClass } from './prism.class';
import { PrismService } from './prism.service';
import { CallbackType } from './prism.type';

/**
 * @export
 * @class PrismComponent
 * @implements {AfterViewChecked}
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'prism-highlight',
  templateUrl: './prism.component.html',
  providers: [ PrismService ]
})
export class PrismComponent extends PrismClass implements AfterViewChecked, OnChanges {

  constructor(public prismService: PrismService) {
    super(prismService);
  }

  ngAfterViewChecked(): void {
    if (this.change === true) {
      this.prismService.highlight(this.codeElementRef, {
        async: this.async,
        callback: this.callback,
        code: this.code,
        interpolation: this.interpolation
      });
      this.change = false;
    }
  }

  /**
   * Detect `code` and `language` property changes.
   * @param {SimpleChanges} changes
   * @memberof PrismComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(['code', 'language'], changes);
  }
}
