import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Componentes de APP
import { AppComponent } from './app.component';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NoPagesFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
