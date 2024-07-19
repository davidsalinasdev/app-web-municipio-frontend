import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

// Servicios
import { PersonaService } from '../../../services/persona.service';
import { PersonaSignalServices } from '../../../services/persona-signals.service';

import * as toastr from 'toastr'; // Importa Toastr
import { Subscription } from 'rxjs';
import { PersonaUpdateSignalService } from '../../../services/persona-update-signal.service';
import { Persona } from '../../../models/persona';


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
  public formularioUpdate!: FormGroup;

  private subscription!: Subscription;

  public idPersona!: number;


  // Select
  public estados = [
    { value: 1, estado: 'Activo' },
    { value: 0, estado: 'Inactivo' }
  ];

  ngOnInit(): void {



    this.subscription = this.personaUpdateSignalServices.dataUpdate$.subscribe((data) => {

      this.idPersona = data.id!;

      this.formularioUpdate.setValue({
        nombresUpdate: data.nombres,
        apellidosUpdate: data.apellidos,
        carnetUpdate: data.carnet,
        estadoUpdate: Number(data.estado),
      });

    });

    this.crearFormulario();

    this.crearFormularioUpdate();

  }


  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private personaServices: PersonaService,
    private personasSignalServices: PersonaSignalServices,
    private personaUpdateSignalServices: PersonaUpdateSignalService,
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

  public crearFormularioUpdate() {

    this.formularioUpdate = this.fb.group({
      nombresUpdate: ['', Validators.required],
      apellidosUpdate: ['', Validators.required],
      carnetUpdate: ['', Validators.required],
      estadoUpdate: ['', Validators.required]
    })

  }
  // Validaciones para formulario
  get nombresUpdate() {
    return this.formularioUpdate.get('nombresUpdate');
  }
  get apellidosUpdate() {
    return this.formularioUpdate.get('apellidosUpdate');
  }

  get carnetUpdate() {
    return this.formularioUpdate.get('carnetUpdate');
  }
  get estadoUpdate() {
    return this.formularioUpdate.get('estadoUpdate');
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


  /**
   * submitUodate
   */
  public submitUpdate(formDirectiveUpdate: FormGroupDirective) {

    const formData: Persona = {

      id: this.idPersona, // Se agrega el id de la persona
      nombres: this.formularioUpdate.value.nombresUpdate,
      apellidos: this.formularioUpdate.value.apellidosUpdate,
      carnet: this.formularioUpdate.value.carnetUpdate,
      estado: this.formularioUpdate.value.estadoUpdate

    }


    this.personaServices.update(formData, this.idPersona).subscribe({
      next: (resp: any) => {

        const { status, persona, message } = resp;

        if (status === 'success') {

          toastr.success(`Se actualizo correctamente`, 'Web GAMDC')
          $('#modal-editar-persona').modal('hide');

          // Emisión de de datos
          this.personasSignalServices.sendData(persona);

          formDirectiveUpdate.resetForm();

        }

      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC')
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
