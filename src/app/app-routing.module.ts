import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';

// Rutas de componentes de AUTH
import { AuthRoutingModule } from './admin/auth/auth-routing.module';
import { authGuard, cantLoadModuleGuard } from './admin/guards/auth.guard';

const routes: Routes = [

  // Para asegurar de que al iniciar tu aplicación en http://localhost:4200 se 
  // redirija directamente a http://localhost:4200/web/inicio
  { path: '', redirectTo: 'web/inicio', pathMatch: 'full' },

  // Plataforma web
  { path: 'web', loadChildren: () => import('./web/web.module').then(m => m.WebModule) },


  // Administrador plataforma web
  {
    path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full'
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard], // Protege una ruta
    canMatch: [cantLoadModuleGuard] // Si no esta logueado no puede cargar la ruta y el modulo
  },


  // Cualquiera otra ruta que no este definida en este routing va a mostrar NoPagesFound
  { path: '**', component: NoPagesFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
