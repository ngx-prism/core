import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrismModule } from './../src/prism.module';
import { TestComponent } from './test.component';

export const declarations = [
  TestComponent
];
export const imports = [
  CommonModule,
  PrismModule
];

@NgModule({
  declarations,
  imports
})
export class TestModule { }
