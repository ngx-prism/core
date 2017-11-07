import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('textarea') textarea: ElementRef;

  async = false;
  code = `
  /*
    ng-content does not change.
    interpolation title: '{{title}}'
  */
  .item {
    text-align: center;
    language: {{language}};
  }`;
  css: string;
  form: FormGroup;
  hooks = {
    'before-sanity-check': (env) => { console.log(`before-sanity-check`, env); },
    'before-highlight': (env) => { console.log(`before-highlight`, env); },
    'after-highlight': (env) => { console.log(`after-highlight`, env); },
    'complete': (env) => { console.log(`complete`, env); },
    'before-insert': (env) => { console.log(`before-insert`, env); }
  };
  html = `
  <prism-highlight
    [async]="async"
    [hooks]="hooks"
    [language]="language"
    [interpolation]="interpolate"
    [code]="code"
    [callback]="callback"
  ></prism-highlight>
  <prism-highlight
    [async]="async"
    [language]="language"
    [interpolation]="interpolate"
  >{{code}}</prism-highlight>`;
  language = 'css';
  languages = [
    'css', 'javascript', 'html', `markup`
  ];
  payload: string;
  selectedLanguage = 'css';
  title = '@ngx-prism/core example';
  ts = `
  async = ${this.async};
  language = '${this.language}';
  code = \`${this.code}\`;
  callback = () => {
    console.log('callback');
  };
  interpolate = {
    language: this.language,
    title: this.title
  };`;

  interpolate = {
    language: this.language,
    title: this.title
  };

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      async: this.async,
      code: this.code,
      html: this.html,
      language: this.language
    });
  }
  callback = () => {
    console.log('callback');
  }
  update($event) {
    console.log(`update()`, $event);
    Object.assign(this, {
      [$event.srcElement.name]: $event.srcElement.value
    });
    this.setTs();
  }
  setTs() {
    this.ts = `
  async = ${this.async};
  language = '${this.language}';
  code = \`${this.code}\`;
  callback = () => {
    console.log('callback');
  };
  interpolate = {
    language: this.language,
    title: this.title
  };`;
  }
  setAsync(value) {
    console.log(`setAsync`, value);
    this.async = (value === true) ? false : true;
    this.setTs();
  }
  setLanguage(value) {
    console.log(`setLanguage`, value);
    this.language = value;
    this.setTs();
  }
  submit(form) {
    console.log(form);
    this.payload = JSON.stringify(form.value);
    for (const key in form.value) {
      if (key) {
        this[key] = form.value[key];
      }
    }
    return false;
  }
}
