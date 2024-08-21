import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes hijas de pages
import { PersonaComponent } from './pages/persona/persona.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UltimasNoticiasComponent } from './pages/ultimas-noticias/ultimas-noticias.component';
import { TitularMercadoComponent } from './pages/mercados/titular-mercado/titular-mercado.component';
import { SectorMercadoComponent } from './pages/mercados/sector-mercado/sector-mercado.component';
import { GestionMercadoComponent } from './pages/mercados/gestion-mercado/gestion-mercado.component';



// Rutas hijas de Admin Module
const childRoutes: Routes = [

    // Rutas personas
    { path: 'persona', component: PersonaComponent, data: { titulo: 'Gestión Persona' } },

    // Rutas usuarios
    { path: 'usuario', component: UsuariosComponent, data: { titulo: 'Gestión Usuarios' } },

    // Rutas ultimas noticias
    { path: 'ultimas-noticias', component: UltimasNoticiasComponent, data: { titulo: 'Gestión Ultimas Noticias' } },

    // Rutas mercados
    { path: 'titular-puesto-mercado', component: TitularMercadoComponent, data: { titulo: 'Gestión Titular Puesto Mercado' } },
    { path: 'sector-mercado', component: SectorMercadoComponent, data: { titulo: 'Gestión Sector Mercado' } },
    { path: 'gestion-mercado', component: GestionMercadoComponent, data: { titulo: 'Gestión Mercados' } },


];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class PageChildRoutesModule { }
