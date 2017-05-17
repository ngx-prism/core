import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';

// load prism
declare var Prism: any;
import 'prismjs/prism';

@Component({
  selector: 'prism-highlight',
  templateUrl: require('./prism.component.html'),
  encapsulation: ViewEncapsulation.None
})
export class PrismComponent implements AfterViewInit {
  @Input('async') private async = true;
  @Input('callback') private callback?: (element: Element) => void | undefined;
  @Input('language') language: string;

  constructor() { }

  ngAfterViewInit() {
    Prism.highlightAll(this.async, this.callback);
  }
}
