import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

 
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validUsername = 'admin';
  validPassword = 'pass';
 
  username: string = '';
  password: string = '';
  
  errorMessage: string = '';
  successMessage: string = '';
  //DI - Router DI using constructor
  constructor(private router:Router){}
 
  login(){
    if(this.username === this.validUsername && this.password===this.validPassword){
      this.successMessage = 'Login Success. Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/ahome']); // Navigate to the dashboard or home page
      },1000)
    }else{
      this.errorMessage = 'Invalid credentials , please try again';
    }
  }
}




