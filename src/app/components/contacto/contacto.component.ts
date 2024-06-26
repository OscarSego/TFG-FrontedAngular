import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ContactoService } from '../../services/contacto.service'
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NavbarComponent, HeaderComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  // Variables para almacenar los datos del formulario de contacto
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  formularioEnviado: string = "";

  // Inyectamos ContactoService y Router en el constructor
  constructor(private contactoService: ContactoService, private router: Router) {}

  // Método para manejar el envío del correo
  enviarCorreo(): void {
    // Llamamos al método enviarCorreo del servicio ContactoService
    this.contactoService.enviarCorreo(this.nombre, this.correo, this.mensaje)
      .subscribe(response => {
        this.formularioEnviado = "Correo enviado";
        setTimeout(() => {
          this.router.navigate(['/home']); // Redirecciona a la página de login después de 3 segundos
        }, 2000);
      }, error => {
        // En caso de error, lo mostramos en la consola
        console.error(error);
      });
  }
  
}
