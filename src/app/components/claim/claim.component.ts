import { Component } from '@angular/core';
import { ClaimService } from '../../services/claim.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ensure ReactiveFormsModule is imported
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink], // Ensure ReactiveFormsModule is included here
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'] // Corrected property name
})
export class ClaimComponent {
  policyId: number = 0;
  claim: any;
  claimForm: FormGroup;
  selectedFile: File | null = null;

  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(private claimService: ClaimService, private fb: FormBuilder) {
    this.claimForm = this.fb.group({
      policyId: [''],
      claimData: this.fb.group({
        claimId: [''],
        claimAmount: [''],
        claimStatus: [''],
        claimDate: [''],
        insuranceCompany: [''],
        sumInsured: [''],
        causeOfLoss: [''],
        dateOfLoss: [''],
        supportingDocuments: [null]
      })
    });
  }
 
  // getClaimByPolicyId() {
    
  //   this.claimService.getClaimByPolicyId(this.policyId).subscribe(
  //     claim => {
  //       this.claim = claim;
  //       //console.log('Claim retrieved successfully', claim);
  //       this.successMessage = 'Claim retrieved successfully',claim;
  //     },
  //     error => {
  //       console.error('Error retrieving claim', error);
  //       this.errorMessage = 'Error retrieving claim'
  //     } 
  //   );
  // }

  getClaimByPolicyId() {
    const policyId = this.claimForm.get('policyId')?.value;
    alert(policyId);
    //this.claimService.setPolicyId(policyId);

    this.claimService.getClaimByPolicyId().subscribe(
      claim => {
        this.claim = claim;
        this.successMessage = 'Claim retrieved successfully';
      },
      error => {
        console.error('Error retrieving claim', error);
        this.errorMessage = 'Error retrieving claim';
      }
    );
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
 
  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }
 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
 
  // onSubmit(): void {
  //   if (this.claimForm.valid && this.selectedFile) {
  //     const policyId = this.claimForm.get('policyId')?.value;
  //     const claimData: Claim = this.claimForm.get('claimData')?.value;
 
  //     // Convert Date objects to strings
  //     claimData.claimDate = new Date(claimData.claimDate).toISOString();
  //     claimData.dateOfLoss = new Date(claimData.dateOfLoss).toISOString();
 
  //     this.claimService.claimInsurance(policyId, claimData, this.selectedFile).subscribe(
  //       (response) => {
  //         console.log('Claim submitted successfully:', response);
  //       },
  //       (error) => {
  //         console.error('Error submitting claim:', error);
  //       }
  //     );
  //   }
  // }

  onSubmit(): void {
    if (this.claimForm.valid && this.selectedFile) {
      let policyId = this.claimForm.get('policyId')?.value;
  
      // Retrieve policy ID from local storage if not provided in the form
      if (!policyId) {
        const storedPolicyId = localStorage.getItem('policyId');
        if (storedPolicyId) {
          policyId = parseInt(storedPolicyId, 10);
        } else {
          this.errorMessage = 'Policy ID is required';
          return;
        }
      }
  
      const claimData: Claim = this.claimForm.get('claimData')?.value;
  
      // Ensure the date values are valid before converting to ISO strings
      if (claimData.claimDate) {
        const claimDate = new Date(claimData.claimDate);
        if (!isNaN(claimDate.getTime())) {
          claimData.claimDate = claimDate.toISOString();
        } else {
          this.errorMessage = 'Invalid claim date';
          return;
        }
      }
  
      if (claimData.dateOfLoss) {
        const dateOfLoss = new Date(claimData.dateOfLoss);
        if (!isNaN(dateOfLoss.getTime())) {
          claimData.dateOfLoss = dateOfLoss.toISOString();
        } else {
          this.errorMessage = 'Invalid date of loss';
          return;
        }
      }
  
      // Log the request payload for debugging
      console.log('Policy ID:', policyId);
      console.log('Claim Data:', claimData);
      console.log('Selected File:', this.selectedFile);
  
      this.claimService.claimInsurance(claimData, this.selectedFile, policyId).subscribe(
        (response) => {
          console.log('Claim submitted successfully:', response);
          this.successMessage = 'Claim submitted successfully';
        },
        (error) => {
          console.error('Error submitting claim:', error);
          this.errorMessage = 'Error submitting claim';
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
  

  // onSubmit(): void {
  //   if (this.claimForm.valid && this.selectedFile) {
  //     const policyId = this.claimForm.get('policyId')?.value;
  //     const claimData: Claim = this.claimForm.get('claimData')?.value;
  
  //     // Ensure the date values are valid before converting to ISO strings
  //     if (claimData.claimDate) {
  //       const claimDate = new Date(claimData.claimDate);
  //       if (!isNaN(claimDate.getTime())) {
  //         claimData.claimDate = claimDate.toISOString();
  //       } else {
  //         this.errorMessage = 'Invalid claim date';
  //         return;
  //       }
  //     }
  
  //     if (claimData.dateOfLoss) {
  //       const dateOfLoss = new Date(claimData.dateOfLoss);
  //       if (!isNaN(dateOfLoss.getTime())) {
  //         claimData.dateOfLoss = dateOfLoss.toISOString();
  //       } else {
  //         this.errorMessage = 'Invalid date of loss';
  //         return;
  //       }
  //     }
  
  //     this.claimService.claimInsurance(policyId, claimData, this.selectedFile).subscribe(
  //       (response) => {
  //         console.log('Claim submitted successfully:', response);
  //         this.successMessage = 'Claim submitted successfully';
  //       },
  //       (error) => {
  //         console.error('Error submitting claim:', error);
  //         this.errorMessage = 'Error submitting claim';
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'Please fill out all required fields.';
  //   }
  // }
}
 
export interface Claim {
  claimId: number;
  claimAmount: number;
  claimStatus: string;
  claimDate: string; // Changed to string
  insuranceCompany: string;
  sumInsured: number;
  causeOfLoss: string;
  dateOfLoss: string; // Changed to string
  supportingDocuments: Uint8Array; // or `Blob` if you prefer
}
 
 