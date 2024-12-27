// src/app/insurance/insurance.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceService } from '../../services/insurance.service';
import { Insurance } from '../../insurance.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 
 
@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  insuranceForm: FormGroup;
 
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private insuranceService: InsuranceService) {
    this.insuranceForm = this.fb.group({
      season: ['', Validators.required],
      year: ['', Validators.required],
      cropName: ['', Validators.required],
      sumInsured: ['', Validators.required],
      area: ['', Validators.required],
      insuranceCompany: ['', Validators.required],
      premiumAmount: [{ value: '', disabled: false }],
      premiumRate: [{ value: '', disabled: false }]
    });
  }
 
  ngOnInit() {}
 
  onApply() {
    if (this.insuranceForm.valid) {
      this.insuranceService.applyInsurance(this.insuranceForm.value).subscribe(
        (response: Insurance) => {
          //localStorage.setItem('policyId', response.policyId.toString());
          this.successMessage = `Application submitted successfully! Policy ID: ${response.policyId}`;

          console.log(response);
          this.insuranceForm.reset(); // Reset the form after successful submission
        },
        (error: any) => {
          this.errorMessage = 'An error occurred while submitting the application.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
 
  calculatePremium() {
    const sumInsured = this.insuranceForm.get('sumInsured')?.value;
    const area = this.insuranceForm.get('area')?.value;
    const season = this.insuranceForm.get('season')?.value.toLowerCase();
 
    let premiumRate = 0;
 
    if (season === 'kharif') {
      premiumRate = 0.02; // 2% for Kharif crops
    } else if (season === 'rabi') {
      premiumRate = 0.015; // 1.5% for Rabi crops
    } else if (season === 'horticulture' || season === 'commercial') {
      premiumRate = 0.05; // 5% for horticultural and commercial crops
    }
 
    if (sumInsured && area) {
      const premiumAmount = sumInsured * area * premiumRate;
 
      this.insuranceForm.patchValue({
        premiumRate: premiumRate,
        premiumAmount: premiumAmount
      });
    }
  }
}
 
 