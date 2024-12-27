import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Farmer } from '../../farmer.model';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  farm: Farmer[] = [];
  username: string = '';
  isUserLoggedIn: boolean = false;

  constructor(public authService: AuthenticationService) { }



}
