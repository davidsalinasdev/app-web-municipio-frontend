import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Servicios
import { PersonaService } from '../../../services/persona.service';
import { PersonaSignalServices } from '../../../services/persona-signals.service';

import * as toastr from 'toastr'; // Importa Toastr

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrl: './modal-persona.component.css'
})
export class ModalPersonaComponent implements OnInit {


  // Formulario
  public formulario!: FormGroup;


  ngOnInit(): void {

    this.crearFormulario();
  }


  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private personaServices: PersonaService,
    private personasSignalServices: PersonaSignalServices,
    private router: Router
  ) {

    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';
  }


  public crearFormulario() {

    this.formulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      carnet: ['', Validators.required],
    })

  }

  // Validaciones para formulario
  get nombres() {
    return this.formulario.get('nombres');
  }
  get apellidos() {
    return this.formulario.get('apellidos');
  }

  get carnet() {
    return this.formulario.get('carnet');
  }

  /**
   * submit
   */
  public submit(formDirective: FormGroupDirective) {

    this.personaServices.store(this.formulario.value).subscribe({
      next: (resp: any) => {

        // Se recupera la persona creada de la respuesta
        const { status, persona, message } = resp;

        if (status === 'success') {
          // Emisión de de datos
          this.personasSignalServices.sendData(persona);

          // Resetear formulario
          formDirective.resetForm();

          // Display a success toast, with a title
          // Configura opciones adicionales y muestra la notificación
          toastr.success(`Se registro correctamente`, 'Web GAMDC')
          // Cierra el modal
          $('#modal-agregar-persona').modal('hide');
        }

      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC')
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

}
