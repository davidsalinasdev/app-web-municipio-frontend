import { Component } from '@angular/core';

// Servicios
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

  menu: any[] = [];
  constructor(private sidebarServices: SidebarService) {
    this.menu = this.sidebarServices.menu;
  }

}
