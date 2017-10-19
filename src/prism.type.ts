import { SimpleChanges } from '@angular/core';

export type CallbackType = () => void;
export type CallbackOnChangesType = (detectedChanges: SimpleChanges) => void;
