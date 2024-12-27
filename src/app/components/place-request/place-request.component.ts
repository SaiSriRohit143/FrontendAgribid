import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-place-request',
  standalone: true,
  imports:[RouterLink,CommonModule],
  templateUrl: './place-request.component.html',
  styleUrls: ['./place-request.component.css']
})
export class PlaceRequestComponent {
  constructor(private authService: AuthenticationService) {}

  errorMessage: string = '';
  successMessage: string = '';
 
  sellCrop(event: Event): void {
    event.preventDefault();
    const form = document.getElementById('sellCropForm') as HTMLFormElement;
    const formData = new FormData(form);
 
    // const postedDateTimeInput = document.getElementById('postedDateTime') as HTMLInputElement;
    // postedDateTimeInput.value = new Date().toISOString();

    const cropDetails = {
      cropName: formData.get('cropName'),
      cropType: formData.get('cropType'),
      basePrice: formData.get('basePrice'),
      currentBid: formData.get('currentBid'),
      quantity: formData.get('quantity'),
      // postedDateTime: new Date().toISOString()
    };
 
    const soilPHCertificate = formData.get('soilPHCertificate') as File;
 
    this.authService.sellCrop(cropDetails, soilPHCertificate).subscribe({
      next: () => {
       // alert('Crop request placed successfully!');
        this.successMessage='Crop request placed successfully!';
        this.hideSellForm();
      },
      error: (error) => {
        console.error('Error:', error);
        //alert('Failed to place crop request.');
        this.errorMessage='Failed to place crop request.';
      }
    });
  }
 
  updateCurrentBid(): void {
    const currentBid = (document.getElementById('currentBid') as HTMLInputElement).value;
    // Logic to update the current bid based on the base price
  }
 
  hideSellForm(): void {
    document.getElementById('sellForm')?.classList.add('hidden');
  }
}
