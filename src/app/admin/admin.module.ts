import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from './shared/shared.module';

// Data tables
import { DataTablesModule } from "angular-datatables";

// Componenetes de Admin Module
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ModalPersonaComponent } from './pages/persona/modal-persona/modal-persona.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ModalUsuariosComponent } from './pages/usuarios/modal-usuarios/modal-usuarios.component';
import { UltimasNoticiasComponent } from './pages/ultimas-noticias/ultimas-noticias.component';
import { SectorMercadoComponent } from './pages/mercados/sector-mercado/sector-mercado.component';
import { TitularMercadoComponent } from './pages/mercados/titular-mercado/titular-mercado.component';
import { GestionMercadoComponent } from './pages/mercados/gestion-mercado/gestion-mercado.component';
import { ModalTitularComponent } from './pages/mercados/titular-mercado/modal-titular/modal-titular.component';
import { ModalSectorComponent } from './pages/mercados/sector-mercado/modal-sector/modal-sector.component';
import { ModalPuestoComponent } from './pages/mercados/puesto-mercado/modal-puesto/modal-puesto.component';
import { PuestoMercadoComponent } from './pages/mercados/puesto-mercado/puesto-mercado.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    PersonaComponent,
    ModalPersonaComponent,
    UsuariosComponent,
    ModalUsuariosComponent,
    UltimasNoticiasComponent,
    SectorMercadoComponent,
    TitularMercadoComponent,
    GestionMercadoComponent,
    ModalTitularComponent,
    ModalSectorComponent,
    ModalPuestoComponent,
    PuestoMercadoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class AdminModule { }
