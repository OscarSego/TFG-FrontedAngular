import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarritoService } from '../../services/carro.service';
import { UserItemCarrito } from '../../interfaces/carro';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NavbarComponent, HeaderComponent],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {

  elementosCarrito: UserItemCarrito[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.verCarrito();
  }

  verCarrito(): void {
    this.carritoService.verCarrito().subscribe(
      (data: UserItemCarrito[]) => {
        this.elementosCarrito = data;
        console.log(this.elementosCarrito)
      },
      (error) => {
        console.error('Error al obtener el carrito:', error);
        // Manejar el error según tu lógica de la aplicación
      }
    );
  }
}
