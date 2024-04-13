import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../services/contacto.service'
import { PublicNavbarComponent } from '../public-navbar/public-navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-public-contacto',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, PublicNavbarComponent, HeaderComponent, FooterComponent],
  templateUrl: './public-contacto.component.html',
  styleUrl: './public-contacto.component.css'
})
export class PublicContactoComponent {

  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  constructor(private contactoService: ContactoService, private router: Router) {}

  enviarCorreo(): void {
    this.contactoService.enviarCorreo(this.nombre, this.correo, this.mensaje)
      .subscribe(response => {
        this.router.navigate(['/homePublic']);
      }, error => {
        console.error(error);
      });
  }

}
