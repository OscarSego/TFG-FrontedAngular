import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarritoService } from '../../services/carro.service';
import { UserItemCarrito } from '../../interfaces/carro';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NavbarComponent, HeaderComponent,FooterComponent],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {

  // Lista para almacenar los elementos del carrito
  elementosCarrito: UserItemCarrito[] = [];
  // Variable para almacenar el ID del ítem
  itemID: number = 0;

  // Inyectamos CarritoService en el constructor
  constructor(private carritoService: CarritoService) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.verCarrito(); // Llamamos al método para ver el carrito
  }

  // Método para obtener los elementos del carrito
  verCarrito(): void {
    this.carritoService.verCarrito().subscribe(
      (data: UserItemCarrito[]) => {
        this.elementosCarrito = data; // Asignamos los datos recibidos a la lista de elementos del carrito
        console.log(this.elementosCarrito); // Mostramos los datos en la consola
      },
      (error) => {
        console.error('Error al obtener el carrito:', error); // Mostramos el error en caso de fallo
      }
    );
  }

  aumentarCantidad(itemID: number): void {
    console.log('Item ID:', itemID);
    this.carritoService.aumentarCantidadProducto(itemID).subscribe(
      (response) => {
        console.log(response);
        // Actualizar la vista llamando de nuevo a verCarrito()
        this.verCarrito();
      },
      (error) => {
        console.error('Error al aumentar la cantidad:', error);
      }
    );
  }

  disminuirCantidad(itemID: number): void {
    console.log('Item ID:', itemID);
    this.carritoService.disminuirCantidadProducto(itemID).subscribe(
      (response) => {
        console.log(response);
        // Actualizar la vista llamando de nuevo a verCarrito()
        this.verCarrito();
      },
      (error) => {
        console.error('Error al aumentar la cantidad:', error);
      }
    );
  }

  borrarCarro(): void {
    this.carritoService.borrarCarro()
      .subscribe(
        (data) => {
          console.log('Carrito borrado correctamente');
          this.verCarrito();
        },
        (error) => {
          console.error('Error al borrar el carrito:', error);
        }
      );
  }
}
