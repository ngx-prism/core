// @angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// internal
import { PrismComponent } from './prism.component';

/**
 * Angular Module for Prism
 * @export
 * @class PrismModule
 */
@NgModule({
  declarations: [ PrismComponent ],
  exports: [ PrismComponent ],
  imports: [ CommonModule ]
})
export class PrismModule { }
