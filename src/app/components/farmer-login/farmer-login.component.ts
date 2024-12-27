import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-farmer-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './farmer-login.component.html',
  styleUrl: './farmer-login.component.css'
})
export class FarmerLoginComponent {

  
  
  loginForm: FormGroup;
  updatePasswordForm: FormGroup;
  showForgotPasswordForm = false;
 
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
 
    this.updatePasswordForm = this.fb.group({
      emailId: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }
 
  
  onLogin() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;
 
      this.authService.login(loginRequest).subscribe(
        response => {
          console.log('Login successful', response);
          // alert('Login successful');
          this.successMessage = 'Login Success. Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/fhome']); // Navigate to the dashboard or home page
          },1000)
        },
        error => {
          console.error('Error during login', error);
          //alert('Error during login. Please try again.');
          this.errorMessage = 'Email and Password must be correct';
        }
      );
    } else {
      this.errorMessage = 'Form is invalid';
      this.loginForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
 
  toggleForgotPassword() {
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
            
          }, 500); // Redirect to login form after 2 seconds
        },
        error => {
          console.error('Error updating password', error);
          //alert('Error updating password. Please try again.');
          this.errorMessage = 'Error updating password. Please try again.';
        }
      );
    } else {
      //alert('Form is invalid');
      this.errorMessage = 'Form is invalid';
      this.updatePasswordForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
}

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthenticationService } from '../../services/authentication.service';
// import { RouterLink } from '@angular/router';
 
// @Component({
//   selector: 'app-farmer-login',
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule,RouterLink],
//   templateUrl: './farmer-login.component.html',
//   styleUrl: './farmer-login.component.css'
// })
// export class FarmerLoginComponent {
 
 
 
//   loginForm: FormGroup;
//   updatePasswordForm: FormGroup;
//   showForgotPasswordForm = false;
 
//   errorMessage: string = '';
//   successMessage: string = '';
 
//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthenticationService,
//     private router:Router
//   ) {
//     this.loginForm = this.fb.group({
//       emailId: ['', Validators.required],
//       password: ['', Validators.required]
//     });
 
//     this.updatePasswordForm = this.fb.group({
//       emailId: ['', Validators.required],
//       newPassword: ['', Validators.required]
//     });
//   }
 
 
//   onLogin() {
//     if (this.loginForm.valid) {
//       const loginRequest = this.loginForm.value;
 
//       this.authService.login(loginRequest).subscribe(
//         response => {
//           console.log('Login successful', response);
//           // alert('Login successful');
//           this.successMessage = 'Login Success. Redirecting...';
//           setTimeout(() => {
//             this.router.navigate(['/fhome']); // Navigate to the dashboard or home page
//           },1000)
//         },
//         error => {
//           console.error('Error during login', error);
//           //alert('Error during login. Please try again.');
//           this.errorMessage = 'Email and Password must be correct';
//         }
//       );
//     } else {
 
//       this.errorMessage = 'Form is invalid';
//       this.loginForm.markAllAsTouched(); // Highlight all invalid fields
//     }
//   }
 
//   toggleForgotPassword() {
//     this.showForgotPasswordForm = !this.showForgotPasswordForm;
//   }
 
//   onUpdatePassword() {
//     if (this.updatePasswordForm.valid) {
//       const updateRequest = this.updatePasswordForm.value;
 
//       this.authService.updatePassword(updateRequest).subscribe(
//         response => {
//           console.log('Password updated successfully', response);
//           alert('Password updated successfully');
//           this.successMessage = 'Password updated successfully';
//           setTimeout(() => {
//             this.showForgotPasswordForm = false;
//           }, 2000); // Redirect to login form after 2 seconds
//         },
//         error => {
//           console.error('Error updating password', error);
//           alert('Error updating password. Please try again.');
//           this.errorMessage = 'Error updating password. Please try again.';
//         }
//       );
//     } else {
//       alert('Form is invalid');
//       this.errorMessage = 'Form is invalid';
//       this.updatePasswordForm.markAllAsTouched(); // Highlight all invalid fields
//     }
//   } 
// }
 
 