import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/products.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [RouterOutlet, RouterModule,NavbarComponent,  CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {

  // Variable para almacenar el producto buscado
  product: Product | null = null;
  // Variable para manejar el estado de carga
  loading = false;
  // Lista de productos
  listProducts: Product[] = [];

  mensajeProductoAgregado:string = "";

  // Inyectamos ProductService y Router en el constructor
  constructor(private _productService: ProductService,
    private router: Router) {}

    // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Suscribimos al observable searchedProduct$ del servicio ProductService
    this._productService.searchedProduct$.subscribe(
      (product: Product | null) => {
        // Muestra en la consola el producto buscado
        console.log('Producto buscado:', product);
        // Asigna el producto buscado a la variable product
        this.product = product;
      }
    );
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
