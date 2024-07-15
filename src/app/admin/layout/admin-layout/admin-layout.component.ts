import { Component, OnInit } from '@angular/core';

declare function customInitFunctions(): any;


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  ngOnInit(): void {
    customInitFunctions();
  }

}
