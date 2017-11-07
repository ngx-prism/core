import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // added
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @ngx
/*
  package.json: --aot added to ng serve
*/
import { PrismModule } from '@ngx-prism/core';
import { DocsExampleModule } from '@ngx-docs/example'; // added

// internal
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,

    // @angular/material
    MatButtonModule, // added
    MatCheckboxModule, // added
    MatInputModule, // added
    MatRadioModule, // added
    MatSidenavModule, // added

    // @ngx-docs
    DocsExampleModule,

    // @ngx-prism
    PrismModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
