import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes hijas de pages
import { PersonaComponent } from './pages/persona/persona.component';



// Rutas hijas de Admin Module
const childRoutes: Routes = [

    { path: 'persona', component: PersonaComponent, data: { titulo: 'Gestión Persona' } }

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class PageChildRoutesModule { }
