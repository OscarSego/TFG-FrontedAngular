import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
  export class ContactoService {

    constructor(private httpClient:HttpClient,
        private router: Router, ) {}

    enviarCorreo(nombre: string, correo: string, mensaje: string): Observable<any> {
        const body = {
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        };

        const token = this.extractToken();

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.httpClient.post<any>(`http://localhost:8000/api/contacto/enviar-correo`, body, { headers: headers }).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400 || error.status === 401) {
                this.router.navigate(['/home']); 
              }
              return throwError(error);
            })
          );

    }


    private extractToken(): string {
        const tokenData = localStorage.getItem('token');
        
        if (tokenData) {
          try {
            const tokenObject = JSON.parse(tokenData);
            return tokenObject.token;
          } catch (error) {
            console.error('Error parsing token data:', error);
          }
        }
    
        return '';
      }
  }