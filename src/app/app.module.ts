import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeEnGb from '@angular/common/locales/en-GB';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { MainListComponent } from './components/main-list/main-list.component';


import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localeEnGb);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-GB" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
