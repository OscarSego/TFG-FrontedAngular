import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicNavbarComponent } from '../public-navbar/public-navbar.component';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-public-product',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, PublicNavbarComponent , HeaderComponent, FooterComponent],
  templateUrl: './public-product.component.html',
  styleUrl: './public-product.component.css'
})
export class PublicProductComponent {

   // Variable para almacenar la lista de productos
   listProducts: Product[] = [];

   mensajeProductoAgregado: string = '';
   
   // Inyectamos ProductService en el constructor
   constructor(private _productService: ProductService){}
 
   // Método que se ejecuta al inicializar el componente
   ngOnInit(): void{
     this.getProductList();
   }
 
   // Método para obtener la lista de productos desde el servicio ProductService
   getProductList(){
     // Verificamos que la respuesta sea una lista válida y no esté vacía
     this._productService.listProducts().subscribe((data: any[]) => {
       if (Array.isArray(data) && data.length > 0) {
         console.table(data);
         // Asignamos la lista de productos a la variable local
         this.listProducts = data;
       } else {
         console.error("La respuesta del servicio no contiene una lista de productos válida o está vacía.");
       }
     });
   }
 

}
