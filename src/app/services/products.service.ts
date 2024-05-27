import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // BehaviorSubject para gestionar el producto buscado
  private searchedProductSubject = new BehaviorSubject<Product | null>(null);
  searchedProduct$ = this.searchedProductSubject.asObservable();

  // Inyectamos HttpClient y Router en el constructor
  constructor(private httpClient:HttpClient,
    private router: Router, ) {}

    private apiUrl = 'http://localhost:8000/api/producto';

    // Método para listar los productos
    listProducts(): Observable<Product[]>{

      const token = this.extractToken();
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      // Realizamos una solicitud GET al servidor para obtener la lista de productos
      return this.httpClient.get<Product[]>(`http://localhost:8000/api/producto`, {headers: headers}).pipe(
        // Manejamos los errores en la respuesta HTTP
        catchError((error:HttpErrorResponse) =>{
          if(error.status === 400 || error.status === 401){
            this.router.navigate(['/login']);
          }
          return throwError(error);
        }
        ))
    }

    // Método para agregar un producto al carrit
    agregarAlCarrito(productoId: number): Observable<any> {
      const token = this.extractToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(headers)

      // Realizamos una solicitud POST al servidor para agregar el producto al carrito
      return this.httpClient.post<any>(`http://localhost:8000/api/producto/agregar-al-carrito/${productoId}`,null, {headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/producto']);
        }
        return throwError(error);
      }
      ))
    }

    // Método para buscar un producto por nombre
    searchProduct (nombre:string): Observable<Product>{

      const token = this.extractToken();
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      // Realizamos una solicitud GET al servidor para buscar el producto por nombre
      return this.httpClient.get<Product>(`${this.apiUrl}/nombre/${nombre}`, {headers: headers}).pipe(
        // Manejamos los errores en la respuesta HTTP
        catchError((error:HttpErrorResponse) =>{
          if(error.status === 400 || error.status === 401){
            this.router.navigate(['/producto']);
          }
          return throwError(error);
        }
        ))
    }
  
  // Método para actualizar el producto buscado en el BehaviorSubject
  setSearchedProduct(product: Product | null) {
    this.searchedProductSubject.next(product);
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
