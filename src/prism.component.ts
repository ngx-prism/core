import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';

const Prism = require('prismjs');

@Component({
  selector: 'prism-highlight',
  template: `
    <pre *ngIf="language">
      <code class="language-{{language}}">
        <ng-content></ng-content>
      </code>
    </pre>
  `,
  encapsulation: ViewEncapsulation.None
})
export class PrismComponent implements AfterViewInit {
  @Input('language') language: string;

  constructor() { }

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
