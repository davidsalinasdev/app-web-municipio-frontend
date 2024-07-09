import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    // Desplazarse a la parte superior de la página cuando se inicia el componente
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Usa 'auto' si no quieres la animación suave
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollTop = window.scrollY;
    console.log('Desplazamiento actual:', scrollTop);
    // Aquí puedes agregar la lógica que necesites al desplazar la página
  }


}
