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
  imports: [ CommonModule ],
  exports: [ PrismComponent ]
})
export class PrismModule { }
