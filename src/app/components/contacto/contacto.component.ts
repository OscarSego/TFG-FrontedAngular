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

  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  constructor(private contactoService: ContactoService, private router: Router) {}

  enviarCorreo(): void {
    this.contactoService.enviarCorreo(this.nombre, this.correo, this.mensaje)
      .subscribe(response => {
        this.router.navigate(['/home']);
      }, error => {
        console.error(error);
      });
  }
  
}
