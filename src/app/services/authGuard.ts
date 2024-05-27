import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyectamos el servicio UserService y el Router en el constructor
  constructor(private _userService: UserService, private router: Router) {}

  // Método canActivate que se ejecuta para verificar si se permite la navegación
  canActivate(): boolean {
    // Verificamos si el usuario está logueado utilizando el método isLoggedIn del UserService
    if (this._userService.isLoggedIn()) {
      // Si el usuario está logueado, permitimos la navegación retornando true
      return true;
    } else {
      // Si el usuario no está logueado, redirigimos a la página de login
      this.router.navigate(['/login']); 
      // Retornamos false para evitar la navegación
      return false;
    }
  }
}
