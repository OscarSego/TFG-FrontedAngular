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

  listProducts: Product[] = [];
  
  constructor(private _productService: ProductService){}

  ngOnInit(): void{
    this.getProductList();
  }

  getProductList(){
    this._productService.listProducts().subscribe((data: any[]) => {
      if (Array.isArray(data) && data.length > 0) {
        console.table(data);
        this.listProducts = data;
      } else {
        console.error("La respuesta del servicio no contiene una lista de productos válida o está vacía.");
      }
    });
  }

  agregarAlCarrito(productoId: number): void {
    this._productService.agregarAlCarrito(productoId).subscribe(
      (productos: Product[]) => {
        // Manejar la respuesta aquí si es necesario
      },
      (error) => {
        console.error(error);
        // Manejar el error aquí, por ejemplo, redirigir a la página de inicio de sesión si hay un error de autorización
      }
    );
  }

}
