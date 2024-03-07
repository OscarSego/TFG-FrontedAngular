import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';


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
        
        localStorage.setItem('token',JSON.stringify(token))
        this.router.navigate(['/home'])
        console.log(token)
      }
    })

  }

}
