import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink } from '@angular/router';
// import { Farmer } from '../../farmer.model';
import { FarmerListComponent } from '../farmer-list/farmer-list.component';



@Component({
  selector: 'app-farmer-home',
  standalone: true,
  imports: [RouterLink,FarmerListComponent],
  templateUrl: './farmer-home.component.html',
  styleUrl: './farmer-home.component.css'
})
export class FarmerHomeComponent {

}

