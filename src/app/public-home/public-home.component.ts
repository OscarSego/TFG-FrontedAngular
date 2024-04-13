import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicNavbarComponent } from '../public-navbar/public-navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, PublicNavbarComponent , HeaderComponent, FooterComponent],
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.css'
})
export class PublicHomeComponent {

}
