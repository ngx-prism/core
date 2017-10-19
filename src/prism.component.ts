// external
import {
  AfterViewChecked,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import Prism from 'prismjs';

// internal
import { PrismHoodClass } from './prism.class';
import { PrismService } from './prism.service';

/**
 * @export
 * @class PrismComponent
 * @extends {PrismHoodClass}
 * @implements {AfterViewChecked}
 * @implements {OnChanges}
 */
//#region Component
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ PrismService ],
  selector: 'prism-highlight',
  templateUrl: './prism.component.html'
})
export
  class PrismComponent
  extends PrismHoodClass
  implements
  AfterViewChecked,
  OnChanges {

  /**
   * Creates an instance of PrismComponent.
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {PrismService} prismService
   * @memberof PrismComponent
   */
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public prismService: PrismService
  ) {
    super(changeDetectorRef, prismService);
  }

  /**
   * @memberof PrismComponent
   */
  ngAfterViewChecked(): void {
    this.highlightElement(true);
  }

  /**
   * Detect `code` and `language` property changes.
   * @param {SimpleChanges} changes
   * @memberof PrismComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(['code', 'language'], changes, (detectedChanges: SimpleChanges) => {
      this.change = true;
    });
  }
}
//#endregion
