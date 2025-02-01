import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';
// Importa Bootstrap
// import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public listBanners: any = [];

  constructor(private headerServices: HeaderService) { }

  ngOnInit(): void {
    this.indexBaners();
  }

  /**
 * indexBaners
 */
  public indexBaners() {
    this.headerServices.indexCarrusel().subscribe({
      next: (resp: any) => {

        const { data } = resp;
        this.listBanners = data;
        // console.log(this.listBanners);

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    })
  }

}
