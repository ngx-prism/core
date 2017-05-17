import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';

const Prism = require('prismjs');

@Component({
  selector: 'prism-highlight',
  templateUrl: require('./prism.component.html'),
  encapsulation: ViewEncapsulation.None
})
export class PrismComponent implements AfterViewInit {
  @Input('language') language: string;

  constructor() { }

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
