import { Component } from '@angular/core';
import { CountUp } from 'countup.js';
// import { gsap } from 'gsap';


@Component({
  selector: 'app-gobierno-electronico',
  templateUrl: './gobierno-electronico.component.html',
  styleUrl: './gobierno-electronico.component.css'
})
export class GobiernoElectronicoComponent {



  // Hook ngAfterViewInit de Angular para asegurarnos de que el DOM esté completamente 
  // cargado antes de iniciar las animaciones.
  ngAfterViewInit() {

    // Con libreria CountUp
    const options = {
      duration: 2, // duración de la animación en segundos
      useEasing: true,
      useGrouping: true,
      separator: ',',
    };

    const projects = new CountUp('projects', 62000, options);
    const signals = new CountUp('signals', 4800, options);
    const progress = new CountUp('progress', 70, options);
    const greenAreas = new CountUp('greenAreas', 50, options);
    const camaras = new CountUp('camaras', 50, options);
    const wifi = new CountUp('wifi', 50, options);
    const green = new CountUp('areas-verdes', 50, options);

    projects.start();
    signals.start();
    progress.start();
    greenAreas.start();
    camaras.start();
    wifi.start();
    green.start();

    // Con libreria GSAP
    // gsap.to("#projects", { innerText: 55, duration: 2, snap: { innerText: 1 } });
    // gsap.to("#signals", { innerText: 4800, duration: 2, snap: { innerText: 1 } });
    // gsap.to("#progress", { innerText: 70, duration: 2, snap: { innerText: 1 } });
    // gsap.to("#greenAreas", { innerText: 50, duration: 2, snap: { innerText: 1 } });
    // gsap.to("#camaras", { innerText: 50, duration: 2, snap: { innerText: 1 } });
    // gsap.to("#wifi", { innerText: 50, duration: 2, snap: { innerText: 1 } });
    // gsap.to("#areas-verdes", { innerText: 50, duration: 2, snap: { innerText: 1 } });
  }
}

