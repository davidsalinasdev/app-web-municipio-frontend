import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Servicios
import { PersonaService } from '../../../services/persona.service';
import { PersonaSignalServices } from '../../../services/persona-signals.service';



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
  ) { }


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
  public submit() {

    this.personaServices.store(this.formulario.value).subscribe({
      next: (resp: any) => {


        // Se recupera la persona creada de la respuesta
        const { status, persona } = resp;

        if (status === 'success') {

          // Emisión de de datos
          this.personasSignalServices.sendData(persona);

          // Cierra el modal
          $('#modal-agregar-persona').modal('hide');
        }

      },
      error: (err) => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

}
