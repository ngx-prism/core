# @ngx-prism/core

[![npm version](https://badge.fury.io/js/%40ngx-prism%2Fcore.svg)](https://badge.fury.io/js/%40ngx-prism%2Fcore)
[![GitHub version](https://badge.fury.io/gh/ngx-prism%2Fcore.svg)](https://badge.fury.io/gh/ngx-prism%2Fcore)
[![Build Status](https://travis-ci.org/ngx-prism/core.svg?branch=master)](https://travis-ci.org/ngx-prism/core)
[![Known Vulnerabilities](https://snyk.io/test/github/ngx-prism/core/badge.svg)](https://snyk.io/test/github/ngx-prism/core)

[![GitHub issues](https://img.shields.io/github/issues/ngx-prism/core.svg)](https://github.com/ngx-prism/core/issues)
[![GitHub forks](https://img.shields.io/github/forks/ngx-prism/core.svg)](https://github.com/ngx-prism/core/network)
[![GitHub stars](https://img.shields.io/github/stars/ngx-prism/core.svg)](https://github.com/ngx-prism/core/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ngx-prism/core/master/LICENSE)

Simple Angular 4+ Prism highlighter module. [Click](https://github.com/ngx-prism/rxjs) to get package with rxjs on board.   
**Next update will be available only on [@angular-package](https://github.com/angular-package/angular-package)** with name `@angular-package/prism/core`. 

* [Demonstration](#demonstration)
* [Installation](#installation)
* [Usage](#usage)
* [Inputs](#inputs)
* [Lifecycle Hooks](#lifecycle-hooks)
* [Change detection](#change-detection)
* [Scripts](#scripts)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)
* [Donate](#donate)

---

**Pros(+)**
* **AOT** (Ahead Of Time Compilation) package: *faster rendering*, *fewer asynchronous requests*, *smaller Angular framework download size*, *detect template errors earlier*, *better security*.
* **MIT** License: it can be used commercially.
* Component `changeDetectionStrategy` is set to `OnPush`, It gives better overall __performance__. 
* **[New]** Change detector status is initially `Detached` and `detectChanges()` is used in every component property declared in its own property `__properties`. This is because of using [@angular-package/change-detection](https://github.com/angular-package/angular-package/tree/master/packages/change-detection). 
* **Setters** instead of **ngOnChanges()** method to detect changes.
* Dynamically changes highlight string with `code` input property, and dynamically changes properties for change detection by setting them `true` or `false` with input `cd`.
* It uses prismjs `highlightElement(element, async, callback)` to higlight, so `async` and `hooks` internal prism features can be used.
* Interpolates string to highlight with `interpolation` object.
* Performs highlight depending on whether property change detection is active or is not (by checking `cd` property).
* Live `@angular/cli` usage demonstration and inside repository.
* No known vulnerabilities found by **snyk.io**.

**Cons(-)**
* Hooks are defined globally.
* You cannot use both `ng-content` and property `code` the same time.
* Need to provide new instance of objects to get them changed.

**Important!**
* By default all properties are sensitive to detection.
* Instead of using `ngOnChanges` angular cycle hook, now, it base only on **setters** and **getters**. 
* It is designed to use `ng-content` and property `code` separately. You should **NOT** use both the same time.
* In `@angular/cli` add `--aot` to `ng serve` in scripts to have script `"start": "ng serve --aot"`.
* Selector `prism-highlight` is changed to `ngx-prism`.

---

## Demonstration

[Live demonstration](http://ngx-prism.wwwdev.io/core)

Clone this repository:

```bash
git clone https://github.com/ngx-prism/core.git
```

Go to **demo** folder and with your command line write the following:

```bash
npm i && npm start
```

Open http://localhost:4200/ in your browser.


Example demonstration usage of both `core` and `rxjs` is in [https://github.com/ngx-prism/demo](https://github.com/ngx-prism/demo) repository.
To install it, do the following:

```bash
git clone https://github.com/ngx-prism/demo.git
cd demo
npm i && npm start
```

Open http://localhost:4200/ in your browser.


## Installation

First, install `@ngx-prism/core` package with command:

```bash
npm i --save @ngx-prism/core
```

Add peer dependencies:
```bash
npm i --save @types/prismjs@1.9.0 prismjs@1.9.0
```

## Usage

1. Now, import `PrismModule` into your module:

```typescript
// example.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrismModule } from '@ngx-prism/core'; // <----- Here
import { ExampleComponent } from './example.component'; // your component

@NgModule({
  declarations: [ ExampleComponent ],
  imports: [
    CommonModule,
    PrismModule // <----- Here
  ],
  exports: [ ExampleComponent ]
})
export class ExampleModule { }
```

2. Use `<ngx-prism></ngx-prism>` tag with content inside and specify its content with property `[language]` to highlight it:

```typescript
// example.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  template: `
    <ngx-prism [language]="language">
      {{content}}
    </ngx-prism>
  `
})
export class ExampleComponent {
  language = 'html';
  content = '<p>test</p>';
  constructor() { }
}
```

or use `<ngx-prism></ngx-prism>` tag with `[code]` and `[interpolation]` attribute like in `ExampleComponent` below:

```typescript
// example.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  template: `
    <ngx-prism
      [language] = "language"
      [hooks] = "hooks"
      [code] = "content"
      [interpolation] = "interpolate"
    ></ngx-prism>`
})
export class ExampleComponent {
  content = '<p>test {{language}}</p>';
  hooks = {
    'before-sanity-check': (env) => { console.log(`before-sanity-check`, env); },
    'before-highlight': (env) => { console.log(`before-highlight`, env); },
    'after-highlight': (env) => { console.log(`after-highlight`, env); },
    'complete': (env) => { console.log(`complete`, env); },
    'before-insert': (env) => { console.log(`before-insert`, env); }
  };
  interpolate = {
    language: 'language interpolated'
  };
  language = 'html';
  constructor() { }
}
```

* It is possible to import themes files in `@angular/cli`:

```css
@import '~prismjs/themes/prism-coy.css';
@import '~prismjs/themes/prism-dark.css';
@import '~prismjs/themes/prism-funky.css';
@import '~prismjs/themes/prism-okaidia.css';
@import '~prismjs/themes/prism-solarizedlight.css';
@import '~prismjs/themes/prism-tomorrow.css';
@import '~prismjs/themes/prism-twilight.css';
@import '~prismjs/themes/prism.css';
```

### Inputs

| name | Type | Description |
|----------|---------------|--|
| async | boolean | *"Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting very large chunks of code."* - prismjs |
| callback | (element: Element) => void \| undefined = undefined | *"An optional callback to be invoked after the highlighting is done. Mostly useful when async is true, since in that case, the highlighting is done asynchronously."* - prismjs  |
| cd <br /> *(ChangeDetection)* | PropertiesInterface<br /> **{[index:string]:boolean}** | Properties provided with `index` as name and value `true` will be sensitive for changes. |
| code | string | *"A string with the code to be highlighted."* - prismjs |
| **hooks** | Object | Callback with specific execute time and name: `before-sanity-check`, `before-highlight`, `after-highlight`, `complete`, `before-insert`. |
| **interpolation** | Object \| undefined | Data property values to inject.  |
| language | string | *"Valid language identifier, for example 'javascript', 'css'."* - prismjs |


### Lifecycle Hooks 

[Angular Lifecycle Hooks](https://angular.io/guide/lifecycle-hooks)

#### PrismComponent

**ngAfterViewInit()**: 
- Sets property `ready` to `true` which by default is `false`. 
- Property `ready` is used in `highlightElement(result: { code: string, language: string }): void` method to performs when `ready` is set to `true` - `prismService.highlight()` method to highlight code.

**ngAfterContentInit()**: 
- Update `__properties` for change detection with inputted property `cd`.


## Change detection

[Angular source](https://github.com/angular/angular/blob/02394d2d8021c26c4ab80d89efcbba436120d96f/packages/core/src/change_detection/constants.ts)

Component `changeDetectionStrategy` is set to `OnPush` means that the change detector's mode will be initially set to `CheckOnce`, and status `CheckOnce` means that after calling detectChanges the status of the change detector will become `Checked`. Status `Checked` means that the change detector should be skipped until its mode changes to `CheckOnce`.

Change detector status is now manually set to `Detached` by default and it means that its sub tree is not a part of the main tree and should be skipped. However it will call `detectChanges()` in **Setters** with indicated properties.


## Scripts

Clone repository:

```bash
git clone https://github.com/ngx-prism/core.git
```

Go to just created folder:

```bash
cd core
```

To build a clean package, means before that script removes node_modules, dist folder and install dependencies:

```bash
npm run clean:start
```

To build a package:

```bash
npm start
```

To run karma tests:

```bash
npm test
```

## GIT

### Commit

- [AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)   
- [Karma Git Commit Msg](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)

### Versioning

[Semantic Versioning 2.0.0](http://semver.org/)

**Given a version number MAJOR.MINOR.PATCH, increment the:**  
MAJOR version when you make incompatible API changes,  
MINOR version when you add functionality in a backwards-compatible manner, and  
PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.   

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?
>The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

>If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © ngx-prism

## Donate

[Click to donate](https://donorbox.org/help-creating-open-source-software)
