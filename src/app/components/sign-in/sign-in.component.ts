import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  // Variables para almacenar los datos del formulario
  email: string = "";
  password:string = "";
  confirmPassword:string = "";
  errorMessage:string = "";

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {

  }

  // Inyectamos UserService y Router en el constructor
  constructor(
    private _userService: UserService,
    private router: Router
  ){}

  // Método para añadir un nuevo usuario
  addUser(){

    // Validar que el usuario ingrese valore

    if(this.email == "" || this.password == "" || this.confirmPassword == ""){
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validamos que las password sean iguales

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden";
      return;
    }

    // Creamos el objeto

    const user: User = {
      email: this.email,
      password: this.password
    }

    // Llamamos al método signIn del servicio UserService
    this._userService.signIn(user).subscribe(data => {
      // Comprobamos si hay respuesta del servidor
      if (data) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = "Error al registrar usuario, por favor intenta nuevamente.";
      }
    });
  }


}
