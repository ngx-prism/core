import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-component',
  templateUrl: `./test.component.html`
})
export class TestComponent implements OnInit {

  language = 'html';
  content = 'ng-content test';
  ngContent = `${this.content}`;
  code = {
    css: `.myCss { text-align: center; }`,
    html: `<p align="center" style="">My p {{language}}</p>`
  };

  constructor() { }

  ngOnInit() { }
}
