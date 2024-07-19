import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes hijas de pages
import { PersonaComponent } from './pages/persona/persona.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';



// Rutas hijas de Admin Module
const childRoutes: Routes = [

    { path: 'persona', component: PersonaComponent, data: { titulo: 'Gestión Persona' } },
    { path: 'usuario', component: UsuariosComponent, data: { titulo: 'Gestión Usuarios' } }

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class PageChildRoutesModule { }
