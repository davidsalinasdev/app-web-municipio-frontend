import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Modulos que se van a utilizar en APP mudules
import { AuthModule } from './admin/auth/auth.module';

// Interceptor
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { interceptorInterceptor } from './interceptor/interceptor.interceptor';

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
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useValue: interceptorInterceptor, multi: true },
    provideHttpClient(), // Nueva forma de manejar peticiones HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
