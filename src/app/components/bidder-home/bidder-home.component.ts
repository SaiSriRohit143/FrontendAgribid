// import { Component, OnInit } from '@angular/core';
// import { AuthenticationBService } from '../../services/authentication-b.service';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Farmer } from '../../farmer.model';
// import { RouterLink } from '@angular/router';



// interface Crop {
//   bidderId: number;
//   cid: number;
//   cropType: string;
//   cropName: string;
//   basePrice: number;
//   currentBid: number;
//   newBid?: number;
//   postedDateTime: string;

// }

// @Component({
//   selector: 'app-bidder-home',
//   imports: [FormsModule, CommonModule,RouterLink],
//   standalone: true,
//   templateUrl: './bidder-home.component.html',
//   styleUrls: ['./bidder-home.component.css'],
// })
// export class BidderHomeComponent implements OnInit {
//   crops: Crop[] = [];
//   farm: Farmer[] = [];
//   bidderId: string | null = null;

//   constructor(private authService: AuthenticationBService) {}

//   ngOnInit(): void {
//     this.authService.getCrops().subscribe((data: Crop[]) => {
//       this.crops = data;
//     });
//     this.bidderId = localStorage.getItem('bidderId');
//     this.loadCrops()
//   }
  
//   loadCrops(): void {
//     this.authService.getCrops().subscribe({
//       next: (data) => {
//         this.crops = data;
//       },
//       error: (error) => {
//         console.error('Error fetching crops:', error);
//       }
//     });
//   }

//   updateBid(cropId: number, bidAmount: number | undefined): void {
//     if (bidAmount === undefined) {
//       alert('Please enter a valid bid amount.');
//       return;
//     }

//     const crop = this.crops.find(c => c.cid === cropId);
//     if (crop && (bidAmount <= crop.currentBid || bidAmount <= crop.basePrice)) {
//       alert('Bid amount should be greater than both the current bid and the base price.');
//       return;
//     }

//     if (crop) {
//       this.authService.updateCurrentBid(cropId, bidAmount).subscribe({
//         next: (response) => {
//           console.log('Response:', response);
//           alert('Bid Amount Updated Successfully!');
//         },
//         error: (error) => {
//           console.error('Error:', error);
//           alert('Failed to update bid amount.');
//         }
//       });
//     }
//   }

//   isBiddingExpired(postedDateTime: string): boolean {
//     const postedTime = new Date(postedDateTime).getTime();
//     const currentTime = new Date().getTime();
//     const hoursDifference = (currentTime - postedTime) / (1000 * 60 * 60);
//     return hoursDifference > 6;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthenticationBService } from '../../services/authentication-b.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Farmer } from '../../farmer.model';
import { RouterLink } from '@angular/router';

interface Crop {
  bidderId: number;
  cid: number;
  cropType: string;
  cropName: string;
  basePrice: number;
  currentBid: number;
  newBid?: number;
  postedDateTime: string;
}

@Component({
  selector: 'app-bidder-home',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './bidder-home.component.html',
  styleUrls: ['./bidder-home.component.css'],
})
export class BidderHomeComponent implements OnInit {
  crops: Crop[] = [];
  farm: Farmer[] = [];
  bidderId: string | null = null;

  constructor(private authService: AuthenticationBService) {}

  ngOnInit(): void {
    this.loadCrops();
    //this.bidderId = localStorage.getItem('bidderId');
  }

  // loadCrops(): void {
  //   this.authService.getCrops().subscribe({
  //     next: (data) => {
  //       this.crops = data.filter(crop => this.isPostedBeforeSixHours(crop.postedDateTime));
  //     },
  //     error: (error) => {
  //       console.error('Error fetching crops:', error);
  //     }
  //   });
  // }
  loadCrops(): void {
    this.authService.getCrops().subscribe({
      next: (data) => {
        this.crops = data.filter(crop => this.isPostedBeforeSixHours(crop.postedDateTime));
      },
      error: (error) => {
        console.error('Error fetching crops:', error);
        this.crops = [{
          cropName: 'Service Unavailable',
          cropType: 'The Crop Service is currently unavailable. Please try again later.',
          bidderId: 0,
          cid: 0,
          basePrice: 0,
          currentBid: 0,
          postedDateTime: ''
        }];
      }
    });
  }
  

  updateBid(cropId: number, bidAmount: number | undefined): void {
    if (bidAmount === undefined) {
      alert('Please enter a valid bid amount.');
      return;
    }

    const crop = this.crops.find(c => c.cid === cropId);
    if (crop && (bidAmount <= crop.currentBid || bidAmount <= crop.basePrice)) {
      alert('Bid amount should be greater than both the current bid and the base price.');
      return;
    }

    if (crop) {
      this.authService.updateCurrentBid(cropId, bidAmount).subscribe({
        next: (response) => {
          console.log('Response:', response);
          alert('Bid Amount Updated Successfully!');
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to update bid amount.');
        }
      });
    }
  }

  isPostedBeforeSixHours(postedDateTime: string): boolean {
    const postedTime = new Date(postedDateTime).getTime();
    const currentTime = new Date().getTime();
    const hoursDifference = (currentTime - postedTime) / (1000 * 60 * 60);
    return hoursDifference < 6;
  }

  isBiddingExpired(postedDateTime: string): boolean {
    const postedTime = new Date(postedDateTime).getTime();
    const currentTime = new Date().getTime();
    const hoursDifference = (currentTime - postedTime) / (1000 * 60 * 60);
    return hoursDifference > 6;
  }
}
