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

  email: string = "";
  password:string = "";
  confirmPassword:string = "";

  ngOnInit(): void {

  }

  constructor(
    private _userService: UserService,
    private router: Router
  ){}

  addUser(){

    // Validar que el usuario ingrese valore

    if(this.email == "" || this.password == "" || this.confirmPassword == ""){
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validamos que las password sean iguales

    if(this.password != this.confirmPassword){
      alert("Las password no coinciden");
      return;
    }

    // Creamos el objeto

    const user: User = {
      email: this.email,
      password: this.password
    }


    this._userService.signIn(user).subscribe(data => {
      this.router.navigate(['/login']);
    })

  }


}
