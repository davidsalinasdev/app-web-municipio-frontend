import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Modulos que se van a utilizar en APP mudules
import { AuthModule } from './admin/auth/auth.module';

// Interceptor
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TokenInterceptor } from './interceptor/interceptor.interceptor';

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
    AppRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    // Uso de interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // provideHttpClient(), // Nueva forma de manejar peticiones HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
