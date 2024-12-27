import { Component ,OnInit} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { cropDetails } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {
  crops: cropDetails[] = [];
  farmerId: number = 1; // Example farmer ID, replace with actual logic
 
  constructor(private cropService: AuthenticationService) { }
 
  ngOnInit(): void {
    this.cropService.getCropsByFarmerId().subscribe(
      (data: any[]) => {
        this.crops = data.map(crop => ({
          ...crop,
          postedDateTime: new Date(crop.postedDateTime)
        }));
      },
      error => {
        console.error('Error fetching crops', error);
      }
    );
  }
}
 