import { Component, OnInit } from '@angular/core';

import template from './test.component.html';

const selector = 'test-component';

@Component({
  selector,
  template
})
export class TestComponent implements OnInit {

  language = 'html';
  content = 'ng-content test';
  ngContent = `${this.content}`;

  constructor() { }

  ngOnInit() { }
}
