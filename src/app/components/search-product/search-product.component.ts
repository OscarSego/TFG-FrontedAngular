import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/products.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [RouterOutlet, RouterModule,NavbarComponent,  CommonModule, HeaderComponent],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {

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
