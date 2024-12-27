import { Component } from '@angular/core';
import { Crop } from '../../crop.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-crop-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './crop-list.component.html',
  styleUrl: './crop-list.component.css'
})
export class CropListComponent {

  errorMessage: string = '';
  successMessage: string = '';

  message: string = '';

  crops: Crop[] = [];
  // bidderId: string | null = null;

  constructor(private cService: AdminService , private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.cService.getAllCrops().subscribe(data => {
      this.crops = data;
    });
    // this.bidderId = localStorage.getItem('bidderId');
  }


  onApprove(cropId: number): void {
    this.authService.updateCropStatus(cropId, 'approved').subscribe({
      next: (response) => {
        this.successMessage = 'Crop approved successfully';
        this.updateCropStatusInList(cropId, 'approved');
      },
      error: (error) => {
        console.error('Error approving crop:', error);
        this.errorMessage = 'Error approving crop';
      }
    });
  }

  onReject(cropId: number): void {
    this.authService.updateCropStatus(cropId, 'rejected').subscribe({
      next: (response) => {
        this.successMessage = 'Crop rejected successfully';
        this.updateCropStatusInList(cropId, 'rejected');
      },
      error: (error) => {
        console.error('Error rejecting crop:', error);
        this.errorMessage = 'Error rejecting crop';
      }
    });
  }

  private updateCropStatusInList(cropId: number, status: string): void {
    const crop = this.crops.find(c => c.cid === cropId);
    if (crop) {
      crop.status = status;
    }
  }
}
