import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Comonentes de SHARED
import { NavegacionComponent } from './navegacion/navegacion.component';
import { HeaderComponent } from './header/header.component';
import { SeedebarComponent } from './seedebar/seedebar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavegacionComponent,
    HeaderComponent,
    SeedebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavegacionComponent,
    HeaderComponent,
    SeedebarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
