import { Component, OnInit } from '@angular/core';

declare function lightbox(): any;

@Component({
  selector: 'app-lugar-interes',
  templateUrl: './lugar-interes.component.html',
  styleUrl: './lugar-interes.component.css'
})
export class LugarInteresComponent implements OnInit {
  ngOnInit(): void {
    lightbox();
  }

}
