import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componente principal donde sa va a renderizar las rutas hijas
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    data: { titulo: 'Renderzación de componentes ADMIN' },
    loadChildren: () => import('./page-child-routes.module').then(m => m.PageChildRoutesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
