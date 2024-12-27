import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
 
@Component({
  selector: 'app-soldhistory',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './soldhistory.component.html',
  styleUrl: './soldhistory.component.css'
})
export class SoldhistoryComponent implements OnInit {
  crops: any[] = [];
 
  constructor(private authService: AuthenticationService,private cropService: AdminService) {}
 
  ngOnInit(): void {
    this.authService.getCropsByFarmerId1().subscribe({
      next: (data) => {
        const cropsWithStatus = data.map(crop => ({
          ...crop,
          status: crop.status // Adding status directly in the component
        }));
        this.cropService.setCrops(cropsWithStatus);
      },
      error: (error) => {
        console.error('Error fetching sold crops:', error);
      }
    });

    this.cropService.crops$.subscribe(crops => this.crops = crops);
  }

}
 
 