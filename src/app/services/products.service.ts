import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private searchedProductSubject = new BehaviorSubject<Product | null>(null);
  searchedProduct$ = this.searchedProductSubject.asObservable();


  constructor(private httpClient:HttpClient,
    private router: Router, ) {}

    private apiUrl = 'http://localhost:8000/api/producto';

    listProducts(): Observable<Product[]>{

      const token = this.extractToken();
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.httpClient.get<Product[]>(`http://localhost:8000/api/producto`, {headers: headers}).pipe(
        catchError((error:HttpErrorResponse) =>{
          if(error.status === 400 || error.status === 401){
            this.router.navigate(['/login']);
          }
          return throwError(error);
        }
        ))
    }

    verCarrito(): Observable<any> {
      const token = this.extractToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.httpClient.get('http://localhost:8000/api/producto/ver-carrito/', {headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }
      ))
    }
  
    agregarAlCarrito(productoId: number): Observable<any> {
      const token = this.extractToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(headers)

      return this.httpClient.post<any>(`http://localhost:8000/api/producto/agregar-al-carrito/${productoId}`,null, {headers}).pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === 400 || error.status === 401){
          this.router.navigate(['/producto']);
        }
        return throwError(error);
      }
      ))
    }

    searchProduct (nombre:string): Observable<Product>{

      const token = this.extractToken();
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.httpClient.get<Product>(`${this.apiUrl}/nombre/${nombre}`, {headers: headers}).pipe(
        catchError((error:HttpErrorResponse) =>{
          if(error.status === 400 || error.status === 401){
            this.router.navigate(['/producto']);
          }
          return throwError(error);
        }
        ))
    }
  
  setSearchedProduct(product: Product | null) {
    this.searchedProductSubject.next(product);
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
