import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  constructor(
    private loginServices: LoginService,
    private router: Router
  ) { }


  public logout() {

    this.loginServices.logout().subscribe({
      next: (resp: any) => {

        console.log(resp);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);

      }, error: (err: any) => {
        console.log(err);
      }, complete: () => {
        console.log('complete');
      }

    });

  }

}
