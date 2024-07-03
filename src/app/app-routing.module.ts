import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';

const routes: Routes = [

  // Para asegurar de que al iniciar tu aplicación en http://localhost:4200 se 
  // redirija directamente a http://localhost:4200/web/inicio
  { path: '', redirectTo: 'web/inicio', pathMatch: 'full' },

  { path: 'web', loadChildren: () => import('./web/web.module').then(m => m.WebModule) },

  // Cualquiera otra ruta que no este definida en este routing va a mostrar NoPagesFound
  { path: '**', component: NoPagesFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
