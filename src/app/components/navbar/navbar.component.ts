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

  // Formulario de búsqueda
  searchForm: FormGroup;

  // Inyectamos Router, FormBuilder y ProductService en el constructor
  constructor(private router: Router,
    private fb: FormBuilder,
    private _productService: ProductService){
      // Inicializamos el formulario de búsqueda
      this.searchForm = this.fb.group({
        nombre: ['']
      });
    }

  // Método para buscar un producto
  searchProduct(){
    // Obtenemos el valor del campo de búsqueda del formulario
    const nombre = this.searchForm.get('nombre')?.value;
    // Si hay un nombre ingresado, procedemos a buscar el producto
    if(nombre){
      this._productService.searchProduct(nombre).subscribe(data => {
        console.log(data)
         // Establecemos el producto buscado en el servicio
        this._productService.setSearchedProduct(data);
        // Navegamos a la página de búsqueda de productos
        this.router.navigate(['/product-search']);
      })
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
