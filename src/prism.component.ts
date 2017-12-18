// external
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ChangeDetection } from '@angular-package/change-detection';

// internal
import { PrismHoodClass } from './prism.class';
import { PrismService } from './prism.service';

/**
 * @export
 * @class PrismComponent
 * @extends {PrismHoodClass}
 * @implements {AfterViewInit}
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ PrismService ],
  selector: 'ngx-prism',
  templateUrl: './prism.component.html'
})
@ChangeDetection(false, {
  async: true,
  callback: true,
  code: true,
  hooks: true,
  language: true,
  interpolation: true
})
export
  class PrismComponent
  extends PrismHoodClass
  implements
  AfterContentInit,
  AfterViewInit,
  OnInit {

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

  ngAfterContentInit() {
    if (this.cd) {
      this.__properties = this.cd;
    }
  }

  /**
   * @memberof PrismComponent
   */
  ngAfterViewInit() {
    this.ready = true;
    this.highlightElement({
      code: this.code,
      language: this.language
    });
  }

  ngOnInit() {}

}
//#endregion
