import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
  export class CarritoService {

    // Inyectamos HttpClient y Router en el constructor
    constructor(private httpClient:HttpClient,
        private router: Router, ) {}

    // Método para ver el contenido del carrito
    verCarrito(): Observable<any> {
        // Extraemos el token de autenticación
        const token = this.extractToken();

        // Configuramos los encabezados de la solicitud HTTP con el token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        // Realizamos una solicitud GET al servidor para obtener el carrito
        return this.httpClient.get<any>(`http://localhost:8000/api/producto/visualizar-carrito`, {headers}).pipe(
          // Manejamos los errores en la respuesta HTTP
            catchError((error:HttpErrorResponse) =>{
              // Si el error es 400 o 401, redirigimos al usuario a la página de productos
                if(error.status === 400 || error.status === 401){
                  this.router.navigate(['/producto']);
                }
                // Propagamos el error para que pueda ser manejado por otros observadores
                return throwError(error);
              }
              ))
      }

    // Método para aumentar la cantidad de un producto en el carrito
    aumentarCantidadProducto(itemID: number): Observable<any> {
      const token = this.extractToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      console.log(headers)
  
      // Realizamos una solicitud POST al servidor para aumentar la cantidad del producto
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/aumentar-cantidad/${itemID}`, null,  { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
    }

    // Método para disminuir la cantidad de un producto en el carrito
    disminuirCantidadProducto(itemID: number): Observable<any> {
      const token = this.extractToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      console.log(headers)
  
      // Realizamos una solicitud POST al servidor para disminuir la cantidad del producto
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/disminuir-cantidad/${itemID}`, null,  { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
    }
    
    // Método para borrar todo el contenido del carrito
    borrarCarro(): Observable<any> {
      const token = this.extractToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      console.log(headers)
  
      // Realizamos una solicitud POST al servidor para borrar el carrito
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/borrar-carrito`, null,  { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
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