import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-component',
  template: `<prism-highlight [language]="language">{{ngContent}}</prism-highlight>`
  // templateUrl: `./test.component.html`
})
export class TestComponent implements OnInit {

  language = 'html';
  content = 'ng-content test';
  ngContent = `${this.content}`;

  constructor() { }

  ngOnInit() { }
}
