import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-mainlogin',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './mainlogin.component.html',
  styleUrl: './mainlogin.component.css'
})
export class MainloginComponent {
 
}
 
 