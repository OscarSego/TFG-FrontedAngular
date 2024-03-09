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

  email:string = "";
  password:string = "";

  constructor(
    private _userService: UserService,
    private router: Router 
  ){}

  login(){

    console.log(this.email, this.password)

    // Validamos que el usuario ingrese datos
    if(this.email == '' || this.password == ''){
      alert("Los campos son obligatorios");
      return
    }

    // Creamos el body

    const user:User = {
      email: this.email,
      password: this.password
    }
 
    this._userService.login(user).subscribe({
     
      
      next: (token) =>{
        console.log(this.password)
        
        localStorage.setItem('token',JSON.stringify(token))
        this._userService.setLoggedIn(true);
        this.router.navigate(['/home'])
        console.log(token)
      },
      error: (e: HttpErrorResponse) =>{
        if(e.error.msg){
          alert(e.error.msg)
        }
      }
    })

  }

}
