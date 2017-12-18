import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { memoize } from 'lodash-decorators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  async = false;
  prism: Array<any>;
  examples = [
    {
      title: `Property [code] example`,
      debug: 'Add something to debug',
      html: `
      <ngx-prism
        [async]="prism[0]?.async"
        [hooks]="prism[0]?.hooks"
        [language]="prism[0].language"
        [interpolation]="prism[0]?.interpolation"
        [code]="prism[0]?.code"
        [callback]="prism[0]?.callback"
      ></ngx-prism>`,
      ts: `
      [
        {
          async: false,
          hooks: {
            'before-sanity-check': (env) => { console.log('before-sanity-check', env); },
            'before-highlight': (env) => { console.log('before', env); },
            'after-highlight': (env) => { console.log('after', env); },
            'complete': (env) => { console.log('complete', env); },
            'before-insert': (env) => { console.log('before-insert', env); }
          },
          callback: () => {
            console.log('callback() zero');
          },
          code:
  \`    /*
        ng-content does not change.
        interpolation title: '{{title}}'
      */
      .item {
        text-align: center;
        language: {{language}};
      }\`,
          interpolation: {
            language: 'css',
            title: this.examples[0].title
          },
          language: 'css'
        }
      ]`,
      css: ``
    },
    {
      title: `<ng-content></ng-content> example`,
      debug: 'Add something ',
      html: `
      <ngx-prism
        [async]="prism[0]?.async"
        [hooks]="prism[0]?.hooks"
        [language]="prism[0].language"
        [interpolation]="prism[0]?.interpolation"
        [callback]="prism[0]?.callback"
      >{{prism[0]?.ngContent}}</ngx-prism>`,
      ts: `
      [
        {
          async: false,
          hooks: {
            'before-sanity-check': (env) => { console.log('before-sanity-check', env); },
            'before-highlight': (env) => { console.log('before', env); },
            'after-highlight': (env) => { console.log('after', env); },
            'complete': (env) => { console.log('complete', env); },
            'before-insert': (env) => { console.log('before-insert', env); }
          },
          code: \`\`,
          callback: () => {
            console.log('callback() one');
          },
          ngContent:
  \`    <p align="center">
          This is example <strong>html code</strong>.
      </p>\`,
          interpolation: {
            language: 'html',
            title: this.examples[1].title
          },
          language: 'html'
        }
      ]`,
      css: ``
    }
  ];

  form: FormGroup;
  languages = [
    'css', 'javascript', 'html', `markup`
  ];
  payload: string;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.prism = [
      {
        __properties: {
          async: true,
          callback: true,
          code: true,
          hooks: true,
          language: true,
          interpolation: true
        },
        async: true,
        hooks: {
          'before-sanity-check': (env) => { console.log('before-sanity-check', env); },
          'before-highlight': (env) => { console.log('before', env); },
          'after-highlight': (env) => { console.log('after', env); },
          'complete': (env) => { console.log('complete', env); },
          'before-insert': (env) => { console.log('before-insert', env); }
        },
        callback: () => {
          console.log('callback() zero');
        },
        code:
`    /*
      ng-content does not change.
      interpolation title: '{{title}}'
    */
    .item {
      text-align: center;
      language: {{language}};
    }`,
        interpolation: {
          language: 'css',
          title: this.examples[0].title
        },
        language: 'css'
      },
      {
        __properties: {
          async: true,
          callback: true,
          code: false,
          hooks: true,
          language: true,
          interpolation: true
        },
        async: false,
        hooks: {
          'before-sanity-check': (env) => { console.log('before-sanity-check', env); },
          'before-highlight': (env) => { console.log('before', env); },
          'after-highlight': (env) => { console.log('after', env); },
          'complete': (env) => { console.log('complete', env); },
          'before-insert': (env) => { console.log('before-insert', env); }
        },
        code: ``,
        callback: () => {
          console.log('callback() one');
        },
        ngContent:
`    <p align="center">
        This is example <strong>html code</strong>.
    </p>`,
        interpolation: {
          language: 'html',
          title: this.examples[1].title
        },
        language: 'html'
      }
    ];

    // FORM
    this.form = this.fb.group({
      prism: this.createForm()
    });
  }


  update(property) {
    this[property] = Object.assign({}, this[property]);
  }

  keyup($event) {
    console.log(`keyup: update `, $event.srcElement.name);

    // this is the best way to update json data
    this[$event.srcElement.name] = this.form.value[$event.srcElement.name];

    // This won't work with set
    // this.address[$event.srcElement.name] = $event.srcElement.value;

    // This will update address city value
    // this.address = Object.assign({}, { city: $event.srcElement.value });
  }

  /**
   * @returns
   * @memberof AppComponent
   */
  createForm() {
    const arr = [];
    this.prism.forEach((prism, key) => {
      const g = {};
      Object.keys(prism).forEach((v) => {
        if (v === '__properties') {
          g[v] = this.fb.group(this.prism[key][v]);
        } else {
          g[v] = this.prism[key][v];
        }
      });
      arr.push(this.fb.group(g));
    });
    return this.fb.array(arr);
  }

  /**
   * @param {any} form
   * @returns
   * @memberof AppComponent
   */
  submit(form) {
    this.payload = JSON.stringify(form.value);
    console.log(this.payload);
    return false;
  }
}
