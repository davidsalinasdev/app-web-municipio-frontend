import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SeccionNoticiasService } from '../../services/seccion-noticias/seccion-noticias.service';


// jquery en angular
declare var $: any;


@Component({
  selector: 'app-ultimas-noticias',
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css'
})
export class UltimasNoticiasComponent {


  // Formulario
  public formulario!: FormGroup;

  // TODO: Implementar datatable
  @ViewChild('myTableSeccion', { static: false }) table!: ElementRef;

  constructor(private seccionNoticiasServices: SeccionNoticiasService) { }


  /**
   * submit 
   */
  public submit(formDirective: FormGroupDirective) {


  }


  // TODO: Implementar datatable

  // FIN TODO: Implementar datatable



}
