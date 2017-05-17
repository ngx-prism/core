import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrismModule } from './../src/prism.module';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    PrismModule
  ]
})
export class TestModule { }
