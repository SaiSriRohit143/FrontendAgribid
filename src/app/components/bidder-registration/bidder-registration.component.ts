import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationBService } from '../../services/authentication-b.service';

@Component({
  selector: 'app-bidder-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './bidder-registration.component.html',
  styleUrl: './bidder-registration.component.css'
})
export class BidderRegistrationComponent {

  errorMessage: string = '';
  successMessage: string = '';

  details: any = {
    address: {}
  };
  files: any = {};

    constructor(
      private authenticationService: AuthenticationBService,private router:Router
    ) {}
   
    onFileChange(event: any, field: string) {
      this.files[field] = event.target.files[0];
    }
   
    registerBidder() {
      if (this.validateForm()) {
        this.authenticationService.registerBidder(this.details, this.files).subscribe(
          response => {
            console.log('Registration successful', response);
            // alert('Registration successful!');
            this.successMessage = 'Registration successful!';
            setTimeout(() => {
              this.router.navigate(['/bidderlogin']); // Navigate to the dashboard or home page
            },1000)
            
          },
          error => {
            console.error('Error during registration', error);
            // alert('Error during registration. Please try again.');
            this.errorMessage= ('Error during registration. Please try again.');
          }
        );
      } else {
        // alert('Please fill in all required fields correctly.');
        this.errorMessage= ('Please fill in all required fields correctly.');
      }
    }
   
    validateForm(): boolean {
      if (!this.details.email || !this.details.fullName || !this.details.password ||
          !this.details.contactNo || !this.details.accountNo ||
          !this.details.ifscCode ||
          !this.details.address.street || !this.details.address.city ||
          !this.details.address.state || !this.details.address.pincode) {
        return false;
      }
   
      const contactPattern = /^[0-9]{10}$/;
      if (!contactPattern.test(this.details.contactNo)) {
        return false;
      }
   
      // Check if all required files are uploaded
      const requiredFiles = ['aadhaar', 'pan', 'tradeLicense'];
      for (const file of requiredFiles) {
        if (!this.files[file]) {
          return false;
        }
      }
   
      return true;
    }
 
  resetForm(): void {
    this.details = {
    };
    this.files = {};
  }
}


