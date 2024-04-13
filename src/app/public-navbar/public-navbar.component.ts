import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule,ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.css'
})
export class PublicNavbarComponent {

  constructor(private router: Router){}

}
