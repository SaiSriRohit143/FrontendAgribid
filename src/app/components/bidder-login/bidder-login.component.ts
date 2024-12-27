import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationBService } from '../../services/authentication-b.service';


@Component({
  selector: 'app-bidder-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './bidder-login.component.html',
  styleUrl: './bidder-login.component.css'
})
export class BidderLoginComponent {
  loginForm: FormGroup;
  updatePasswordForm: FormGroup;
  showForgotPasswordForm = false;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationBService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
 
    this.updatePasswordForm = this.fb.group({
      email: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }
 
  onLogin(): void {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;

      this.authService.login(loginRequest).subscribe(
        response => {
          console.log('Login successful', response);
          this.successMessage = 'Login Success. Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/bhome']);
          }, 500);
        },
        error => {
          console.error('Error during login', error);
          this.errorMessage = 'Email and Password must be correct';
        }
      );
    } else {
      this.errorMessage = 'An error occurred during login.';
      this.loginForm.markAllAsTouched();
    }
  }

  toggleForgotPassword(): void {
    this.showForgotPasswordForm = !this.showForgotPasswordForm;
  }

  onUpdatePassword() {
    if (this.updatePasswordForm.valid) {
      const updateRequest = this.updatePasswordForm.value;
 
      this.authService.updatePassword(updateRequest).subscribe(
        response => {
          console.log('Password updated successfully', response);
          //alert('Password updated successfully');
          this.successMessage = 'Password updated successfully';
          setTimeout(() => {
            this.showForgotPasswordForm = false;
          }, 2000); // Redirect to login form after 2 seconds
        },
        error => {
          console.error('Error updating password', error);
         // alert('Error updating password. Please try again.');
          this.errorMessage = 'Error updating password. Please try again.';
        }
      );
    } else {
     // alert('Form is invalid');
      this.errorMessage = 'Form is invalid';
      this.updatePasswordForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
}

