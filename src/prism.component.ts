import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';

const Prism = require('prismjs');

const template = require('./prism.component.html');

@Component({
  selector: 'prism-highlight',
  template,
  encapsulation: ViewEncapsulation.None
})
export class PrismComponent implements AfterViewInit {
  @Input('async') private async = false;
  @Input('callback') private callback?: (element: Element) => void | undefined = undefined;
  @Input('language') language: string;

  constructor() { }

  ngAfterViewInit() {
    this.highlightAll(this.async, this.callback);
  }
  highlightElement(element: any, async: boolean, callback?: (element: Element) => void | undefined) {

  }
  highlightAll(async: boolean, callback?: (element: Element) => void | undefined) {
    Prism.highlightAll(async, callback);
  }
}
