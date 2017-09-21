import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-component',
  templateUrl: `./test.component.html`
})
export class TestComponent implements OnInit {

  language = 'html';
  text = 'ng-content-visible';
  interpolated = `<span class="my-class">${this.text}</span>`;
  code = {
    content: `<p align="center">{{interpolated}}</p>`,
    css: `.myCss { text-align: center; }`,
    html: `<p align="center" style="">My p {{interpolated}}</p>`
  };

  constructor() { }

  ngOnInit() { }
}
