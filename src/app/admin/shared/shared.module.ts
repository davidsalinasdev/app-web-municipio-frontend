import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componenetes de Admin Shared Module
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumbsComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
  ]
})
export class SharedModule { }
