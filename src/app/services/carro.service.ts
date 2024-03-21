import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
  export class CarritoService {

    constructor(private httpClient:HttpClient,
        private router: Router, ) {}

    verCarrito(): Observable<any> {

        const token = this.extractToken();

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.httpClient.get<any>(`http://localhost:8000/api/producto/visualizar-carrito`, {headers}).pipe(
            catchError((error:HttpErrorResponse) =>{
                if(error.status === 400 || error.status === 401){
                  this.router.navigate(['/producto']);
                }
                return throwError(error);
              }
              ))
      }

    aumentarCantidadProducto(itemID: number): Observable<any> {
      const token = this.extractToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      console.log(headers)
  
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/aumentar-cantidad/${itemID}`, null,  { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
    }

    disminuirCantidadProducto(itemID: number): Observable<any> {
      const token = this.extractToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      console.log(headers)
  
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/disminuir-cantidad/${itemID}`, null,  { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
    }

    borrarCarro(): Observable<any> {
      const token = this.extractToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      console.log(headers)
  
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/borrar-carrito`, null,  { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
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