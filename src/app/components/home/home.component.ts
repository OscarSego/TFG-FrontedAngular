import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NavbarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
