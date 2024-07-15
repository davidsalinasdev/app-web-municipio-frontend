import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.crearFormulario();
  }

  // Formulario
  public formulario!: FormGroup;

  public loading: boolean = false;

  // Servicios con inyecion de depencencias
  constructor(
    private fb: FormBuilder,
    private loginServices: LoginService,
    private router: Router
  ) { }


  public crearFormulario() {

    this.formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [''],
    })

  }

  // Validaciones para formulario
  get email() {
    return this.formulario.get('email');
  }
  get password() {
    return this.formulario.get('password');
  }

  get remember() {
    return this.formulario.get('remember');
  }

  /**
   * login
   */
  public login() {

    this.loading = true; // Mostrar el preloader mientras se procesa el login

    const formData: Login = this.formulario.value

    this.loginServices.login(formData).subscribe({
      next: (resp: any) => {

        if (resp.token) {
          localStorage.setItem('token', resp.token);
          this.router.navigate(['/admin/dashboard']);
          setTimeout(() => {
            this.loading = false; // Ocultar el preloader si ya llego una respuesta
          }, 5000);
        }

      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });

  }


}