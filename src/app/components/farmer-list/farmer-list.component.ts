import { Component } from '@angular/core';
import { Farmer } from '../../farmer.model';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-farmer-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './farmer-list.component.html',
  styleUrl: './farmer-list.component.css'
})
export class FarmerListComponent {
  farmers: Farmer[] = [];

  constructor(private fService: AdminService) { }

  ngOnInit(): void {
    this.fService.getAllFarmers().subscribe(data => {
      this.farmers = data;
    });
  }
}
