import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
  export class ContactoService {

    // Inyectamos HttpClient y Router en el constructor
    constructor(private httpClient:HttpClient,
        private router: Router, ) {}

    // Método para enviar un correo
    enviarCorreo(nombre: string, correo: string, mensaje: string): Observable<any> {
        const body = {
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        };

        // Extraemos el token de autenticación
        const token = this.extractToken();

        // Configuramos los encabezados de la solicitud HTTP con el token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Realizamos una solicitud POST al servidor para enviar el correo
        return this.httpClient.post<any>(`http://localhost:8000/api/contacto/enviar-correo`, body, { headers: headers }).pipe(
          // Manejamos los errores en la respuesta HTTP
            catchError((error: HttpErrorResponse) => {
              // Si el error es 400 o 401, redirigimos al usuario a la página principal
              if (error.status === 400 || error.status === 401) {
                this.router.navigate(['/home']); 
              }
              // Propagamos el error para que pueda ser manejado por otros observadores
              return throwError(error);
            })
          );

    }

    // Método privado para extraer el token de localStorage
    private extractToken(): string {
        const tokenData = localStorage.getItem('token');
        
        if (tokenData) {
          try {
            // Parseamos el token de JSON
            const tokenObject = JSON.parse(tokenData);
            return tokenObject.token;
          } catch (error) {
            console.error('Error parsing token data:', error);
          }
        }
        // Si no se encuentra el token, devolvemos una cadena vacía
        return '';
      }
  }