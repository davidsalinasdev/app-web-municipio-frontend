import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Como se crean rutas hijas de este modulo, se importa el componente Dashboard
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: 'dashboard', component: AdminLayoutComponent, data: { titulo: 'Renderzacion de componentes ADMIN' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
