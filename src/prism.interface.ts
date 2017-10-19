import { ElementRef } from '@angular/core';
import { CallbackType } from './prism.type';

export interface PrismInterface {
  async: boolean;
  callback?: CallbackType;
  code: string;
  el: ElementRef;
  language: string;
  interpolation?: Object;
}

export interface OptionsInterface  {
  async?: boolean;
  callback?: CallbackType;
  code?: string;
  interpolation?: Object;
};
