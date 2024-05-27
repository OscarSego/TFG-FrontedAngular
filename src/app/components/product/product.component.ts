import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/products.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, RouterModule,NavbarComponent,  CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

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

  // Método para agregar un producto al carrito
  agregarAlCarrito(productoId: number): void {
    this._productService.agregarAlCarrito(productoId).subscribe(
      (productos: Product[]) => {
        this.mensajeProductoAgregado = 'Producto agregado al carrito';
        setTimeout(() => {
          this.mensajeProductoAgregado = '';
        }, 3000);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
