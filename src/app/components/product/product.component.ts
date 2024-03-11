import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/products.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, RouterModule,NavbarComponent,  CommonModule, HeaderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product: Product | null = null;
  loading = false;
  listProducts: Product[] = [];

  constructor(private _productService: ProductService,
    private router: Router) {}

  ngOnInit() {
    this._productService.searchedProduct$.subscribe(
      (product: Product | null) => {
        console.log('Producto buscado:', product);
        this.product = product;
      }
    );
    }
}
