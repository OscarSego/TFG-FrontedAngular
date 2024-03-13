import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterOutlet, RouterModule,ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  searchForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private _productService: ProductService){
      this.searchForm = this.fb.group({
        nombre: ['']
      });
    }

  searchProduct(){

    const nombre = this.searchForm.get('nombre')?.value;

    if(nombre){
      this._productService.searchProduct(nombre).subscribe(data => {
        console.log(data)
        this._productService.setSearchedProduct(data);
        this.router.navigate(['/product-search']);
      })
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
