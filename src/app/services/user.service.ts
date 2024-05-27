import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Variable privada para almacenar el estado de autenticación del usuario
  private loggedIn = false;

  // Inyectamos HttpClient en el constructor
  constructor(private httpClient:HttpClient) {}

  // Método para registrar un nuevo usuario
  signIn(user: User): Observable<any>{

    // Realizamos una solicitud POST al servidor para registrar el usuario
    return this.httpClient.post<any>('/api/users',user);
  }

  // Método para iniciar sesión
  login(user: User): Observable<any>{

    // Realizamos una solicitud POST al servidor para iniciar sesión
    return this.httpClient.post<any>('/api/users/login',user)
  }

  // Método para establecer el estado de autenticación del usuario
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  // Método para comprobar si el usuario está autenticado
  isLoggedIn(): boolean {

    return this.loggedIn;
  }
  
}
