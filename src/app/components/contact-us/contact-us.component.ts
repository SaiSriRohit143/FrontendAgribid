import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };
 
  showAlert = false;
 
  onSubmit() {
    if (this.contact.name && this.contact.email && this.contact.message) {
      console.log('Form submitted:', this.contact);
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000); // Hide alert after 3 seconds
      // Add your form submission logic here
    }
  }
}
