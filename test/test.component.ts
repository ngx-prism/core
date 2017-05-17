import { Component, OnInit } from '@angular/core';

const template = require('./test.component.html');

@Component({
  selector: 'test-component',
  template
})
export class TestComponent implements OnInit {

  language = 'html';
  error = 'testError';
  html = `
    <table>
      <tbody>
        <tr>
          <td>
            row
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      {{error}}
      ma extra P
    </p> ${this.error}`;

  constructor() { }

  ngOnInit() { }
}
