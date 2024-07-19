import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

// Servicios
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { UsuarioSignalService } from './../../../services/usuario/usuario-signal.service';

import * as toastr from 'toastr'; // Importa Toastr
import { Subscription } from 'rxjs';
import { UsuarioUpdateSignalService } from './../../../services/usuario/usuario-update-signal.service';
import { Usuario } from '../../../models/usuario';
import { PersonaService } from '../../../services/persona.service';

// jquery en angular
declare var $: any;

import 'select2';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrl: './modal-usuarios.component.css'
})
export class ModalUsuariosComponent implements OnInit {

  // Formulario
  public formulario!: FormGroup;
  public formularioUpdate!: FormGroup;

  private subscription!: Subscription;

  public idUsuario!: number;

  // Select
  public estados = [
    { value: 1, estado: 'Activo' },
    { value: 0, estado: 'Inactivo' }
  ];


  public listaEstadoPersonas: any[] = [];

  ngOnInit(): void {

    this.subscription = this.usuarioUpdateSignalServices.dataUpdate$.subscribe((data) => {
      this.idUsuario = data.id!;
      this.formularioUpdate.setValue({
        emailUpdate: data.email,
        persona_idUpdate: data.persona_id,
        estadoUpdate: Number(data.estado),
      });
    });

    this.crearFormulario();
    this.crearFormularioUpdate();
    this.indexPersonasEstado();
  }

  // Servicios con inyección de dependencias
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private usuarioSignalServices: UsuarioSignalService,
    private usuarioUpdateSignalServices: UsuarioUpdateSignalService,
    private personaServices: PersonaService
  ) {
    // Configura las opciones predeterminadas de Toastr
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.positionClass = 'toast-top-right';
  }

  public crearFormulario() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      persona_id: ['', Validators.required],
    });
  }

  // Validaciones para formulario
  get email() {
    return this.formulario.get('email');
  }
  get password() {
    return this.formulario.get('password');
  }
  get persona_id() {
    return this.formulario.get('persona_id');
  }

  public crearFormularioUpdate() {
    this.formularioUpdate = this.fb.group({
      emailUpdate: ['', [Validators.required]],
      persona_idUpdate: ['', Validators.required],
      estadoUpdate: ['', Validators.required]
    });
  }

  // Validaciones para formulario update
  get emailUpdate() {
    return this.formularioUpdate.get('emailUpdate');
  }

  get persona_idUpdate() {
    return this.formularioUpdate.get('persona_idUpdate');
  }
  get estadoUpdate() {
    return this.formularioUpdate.get('estadoUpdate');
  }

  /**
   * submit
   */
  public submit(formDirective: FormGroupDirective) {


    this.usuarioService.store(this.formulario.value).subscribe({
      next: (resp: any) => {
        const { status, usuario, message } = resp;
        if (status === 'success') {
          // Emisión de datos
          this.usuarioSignalServices.sendData(usuario);
          // Resetear formulario
          formDirective.resetForm();
          // Muestra una notificación de éxito
          toastr.success(`Usuario registrado correctamente`, 'Web GAMDC');
          // Cierra el modal
          $('#modal-agregar-usuario').modal('hide');
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC');
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  /**
   * submitUpdate
   */
  public submitUpdate(formDirectiveUpdate: FormGroupDirective) {
    const formData: Usuario = {
      id: this.idUsuario, // Se agrega el id del usuario
      email: this.formularioUpdate.value.emailUpdate,

      persona_id: this.formularioUpdate.value.persona_idUpdate,
      estado: this.formularioUpdate.value.estadoUpdate
    };


    this.usuarioService.update(formData, this.idUsuario).subscribe({
      next: (resp: any) => {
        const { status, usuario, message } = resp;
        if (status === 'success') {
          toastr.success(`Usuario actualizado correctamente`, 'Web GAMDC');
          $('#modal-editar-usuario').modal('hide');
          // Emisión de datos
          this.usuarioSignalServices.sendData(usuario);
          formDirectiveUpdate.resetForm();
        }
      },
      error: (err) => {
        toastr.error(`Intente nuevamente`, 'Web GAMDC');
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    });
  }


  public indexPersonasEstado() {

    this.personaServices.indexEstadoPersonas().subscribe({
      next: (resp: any) => {
        const { personas } = resp;
        this.listaEstadoPersonas = [];
        personas.forEach((element: any) => {

          this.listaEstadoPersonas.push({ id: element.id, nombres: element.nombres + ' ' + element.apellidos });

        });

        // console.log(this.listaEstadoPersonas);

      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        // console.log('complete');
      }
    });

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Carga el select2
  ngAfterViewInit() {
    $('#modal-agregar-usuario').on('shown.bs.modal', () => {
      $('#persona-select2').select2({
        dropdownParent: $('#modal-agregar-usuario')
      }).val('').trigger('change'); // Inicializa el select con la opción por defecto seleccionada

      // Sincroniza el valor seleccionado con el FormControl
      $('#persona-select2').on('change', (e: any) => {
        const selectedValue = $(e.target).val();
        this.formulario.get('persona_id')!.setValue(selectedValue);
      });
    });

    $('#modal-editar-usuario').on('shown.bs.modal', () => {
      $('#persona_idUpdate').select2({
        dropdownParent: $('#modal-editar-usuario')
      });

      // Sincroniza el valor seleccionado con el FormControl
      $('#persona_idUpdate').on('change', (e: any) => {
        const selectedValue = $(e.target).val();
        this.formularioUpdate.get('persona_idUpdate')!.setValue(selectedValue);
      });
    });
  }
}
