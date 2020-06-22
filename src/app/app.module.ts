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
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { registerLocaleData } from '@angular/common';
import { OrderModalComponent } from './components/order-modal/order-modal.component';


registerLocaleData(localeEnGb);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainListComponent,
    OrderModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-GB" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
