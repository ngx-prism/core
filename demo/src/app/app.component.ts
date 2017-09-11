import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('textarea') textarea: ElementRef;

  title = 'app';
  language = 'css';
  prismhtml = `
    <b>
      bold
    </b>
  `;
  _prism = `
    /*
      ng-content does not change.
    */
    .item {
      text-align: center;
    }
  `;
  set prism(value: string) {
    this._prism = value;
  }
  get prism(): string {
    return this._prism;
  }


  constructor() { }

  callback = () => {
    console.log('callback');
  }
  update($event) {
    this[$event.srcElement.name] = $event.srcElement.value;
    console.log(this.prism);
  }
  setLanguage($event) {
    this.language = $event.srcElement.value;
  }
}
