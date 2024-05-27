import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class LoginComponent {

  // Variables para almacenar los datos del formulario de inicio de sesión
  email:string = "";
  password:string = "";
  errorMessage: string = "";

  // Inyectamos UserService y Router en el constructor
  constructor(
    private _userService: UserService,
    private router: Router 
  ){}

  // Método para manejar el inicio de sesión
  login(){

    // Mostramos los datos ingresados en la consola para verificar
    console.log(this.email, this.password)

    // Validamos que el usuario ingrese datos
    if(this.email == '' || this.password == ''){
      alert("Los campos son obligatorios");
      return
    }

    // Creamos el objeto usuario con los datos ingresados

    const user:User = {
      email: this.email,
      password: this.password
    }
 
    // Llamamos al método login del servicio UserService
    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this._userService.setLoggedIn(true);
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status) {
          this.errorMessage = "Usuario o contraseña incorrectos";
        } 
      }
    });

  }

}
