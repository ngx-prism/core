import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrismModule } from '@ngx-prism/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrismModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
