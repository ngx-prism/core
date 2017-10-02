import { ElementRef } from '@angular/core';
import { CallbackType } from './prism.type';

export interface PrismInterface {
  async: boolean;
  callback?: CallbackType;
  code: string;
  codeElementRef: ElementRef;
  language: string;
  interpolation?: Object;
}
