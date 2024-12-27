import { Component, OnInit } from '@angular/core';
import { RouterLink,} from '@angular/router';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 
export class HomeComponent {
 
    // Array of image paths
  images: string[] = [
    'images/p1.jpg',  // Replace with your image paths
    'images/p2.jpeg',
    'images/p3.avif',
    'images/f2.avif',
 
 
  ];
   
  // Active image index
   
   
  // Function to move to the left (previous image)
  // Tracks the currently active image
  activeIndex: number = 0;
   
  // Method to move the carousel to the left
  moveLeft(): void {
    if (this.activeIndex === 0) {
        this.activeIndex = this.images.length - 1; // Loop back to the last image
    } else {
        this.activeIndex--;
    }
  }
   
  // Method to move the carousel to the right
  moveRight(): void {
    if (this.activeIndex === this.images.length - 1) {
      this.activeIndex = 0; // Loop back to the first image
    } else {
      this.activeIndex++;
    }
  }
 
}
 
 