import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componente que pertenecen a Web
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { GobiernoComponent } from './pages/gobierno/gobierno.component';
import { NoticiasMediosComponent } from './pages/noticias-medios/noticias-medios.component';
import { ParticipacionCiudadanaComponent } from './pages/participacion-ciudadana/participacion-ciudadana.component';
import { TurismoCulturaComponent } from './pages/turismo-cultura/turismo-cultura.component';
import { SeguridadEmergenciasComponent } from './pages/seguridad-emergencias/seguridad-emergencias.component';
import { EducacionSaludComponent } from './pages/educacion-salud/educacion-salud.component';

const routes: Routes = [
  {
    path: '', component: WebLayoutComponent, data: { titulo: 'Renderzacion de componentes WEB' },
    // Definiendo rutas hijas de este modulo
    children: [ // ruta hija depende del padre
      { path: 'inicio', component: InicioComponent }, // Path inicial
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'gobierno', component: GobiernoComponent },
      { path: 'noticias-medios', component: NoticiasMediosComponent },
      { path: 'participacion-ciudadana', component: ParticipacionCiudadanaComponent },
      { path: 'turismo-cultura', component: TurismoCulturaComponent },
      { path: 'seguridad-emergencias', component: SeguridadEmergenciasComponent },
      { path: 'educacion-salud', component: EducacionSaludComponent },
      { path: '**', redirectTo: 'fullscreen' } // Es la primera ruta que se muestra para este MODULO.
    ]
  } // Path inicial



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
