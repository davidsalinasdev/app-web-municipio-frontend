import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Comonentes de SHARED
import { NavegacionComponent } from './navegacion/navegacion.component';
import { HeaderComponent } from './header/header.component';
import { SeedebarComponent } from './seedebar/seedebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavegacionGadcComponent } from './gadc/navegacion-gadc/navegacion-gadc.component';
import { FooterGadcComponent } from './gadc/footer-gadc/footer-gadc.component';
import { SeedebarGadcComponent } from './gadc/seedebar-gadc/seedebar-gadc.component';
import { HeaderGadcComponent } from './gadc/header-gadc/header-gadc.component';



@NgModule({
  declarations: [
    NavegacionComponent,
    HeaderComponent,
    SeedebarComponent,
    FooterComponent,
    NavegacionGadcComponent,
    FooterGadcComponent,
    SeedebarGadcComponent,
    HeaderGadcComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavegacionComponent,
    HeaderComponent,
    SeedebarComponent,
    FooterComponent,
    NavegacionGadcComponent,
    FooterGadcComponent,
    SeedebarGadcComponent,
    HeaderGadcComponent
  ]
})
export class SharedModule { }
