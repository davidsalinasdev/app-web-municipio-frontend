import { Component, OnInit } from '@angular/core';

// Declara una funcion de manera global
declare function lightbox(): any;

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.css'
})
export class WebLayoutComponent implements OnInit {
  ngOnInit(): void {
    lightbox();
  }
}
