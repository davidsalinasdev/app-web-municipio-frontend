import { Component, HostListener, OnInit } from '@angular/core';

// Declara una funcion de manera global
declare function lightbox(): any;

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.css'
})
export class WebLayoutComponent implements OnInit {

  private delay: number = 100; // Retraso en milisegundos
  private scrollTimeout: any;

  ngOnInit(): void {
    // Inicializa la posición de los íconos de redes sociales
    this.updateIconPosition();

    // Asegúrate de volver a calcular la posición al cargar completamente la página
    window.addEventListener('load', () => {
      this.updateIconPosition();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.updateIconPosition();
    }, this.delay);
  }

  private updateIconPosition() {
    const socialIcons = document.querySelector('.redes-sociales') as HTMLElement;
    if (socialIcons) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      socialIcons.style.top = `${scrollTop + window.innerHeight - 200}px`; // Ajusta la posición según sea necesario
    }
  }
}
