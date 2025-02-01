import { Component } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

  public noticia: any[] = [];

  constructor(private noticiaServices: NoticiasService) { }


  ngOnInit(): void {

    this.indexNoticias();

  }

  /**
   * name
   */
  public indexNoticias() {
    this.noticiaServices.indexCarrusel().subscribe({
      next: (resp: any) => {
        this.noticia = resp.data
        console.log(this.noticia)
      },

      error: (err) => {
        console.log(err)
      },

      complete: () => {
        // console.log('complete') 
      }
    })
  }


}
