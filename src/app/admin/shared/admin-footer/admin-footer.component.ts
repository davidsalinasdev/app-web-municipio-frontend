import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css'
})
export class AdminFooterComponent {
  public getYear() {
    return new Date().getFullYear();
  }
}
