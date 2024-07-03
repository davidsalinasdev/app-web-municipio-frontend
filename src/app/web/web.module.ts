import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';

// Modulo SHARED
import { SharedModule } from './shared/shared.module';

// Componente que pertenecen a Web
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { GobiernoComponent } from './pages/gobierno/gobierno.component';
import { NoticiasMediosComponent } from './pages/noticias-medios/noticias-medios.component';
import { ParticipacionCiudadanaComponent } from './pages/participacion-ciudadana/participacion-ciudadana.component';
import { TurismoCulturaComponent } from './pages/turismo-cultura/turismo-cultura.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EducacionSaludComponent } from './pages/educacion-salud/educacion-salud.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { LugarInteresComponent } from './components/lugar-interes/lugar-interes.component';
import { GobiernoElectronicoComponent } from './components/gobierno-electronico/gobierno-electronico.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';


@NgModule({
  declarations: [
    WebLayoutComponent,
    InicioComponent,
    NosotrosComponent,
    ServiciosComponent,
    GobiernoComponent,
    NoticiasMediosComponent,
    ParticipacionCiudadanaComponent,
    TurismoCulturaComponent,
    ContactoComponent,
    EducacionSaludComponent,
    NoticiasComponent,
    EventosComponent,
    LugarInteresComponent,
    GobiernoElectronicoComponent,
    UbicacionComponent,
    ContactanosComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ]
})
export class WebModule { }
