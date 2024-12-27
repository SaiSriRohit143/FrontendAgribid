import { Component } from '@angular/core';
import { Bidder } from '../../bidder.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bidder-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './bidder-list.component.html',
  styleUrl: './bidder-list.component.css'
})
export class BidderListComponent {

  bidders: Bidder[] = [];

  constructor(private bService: AdminService) { }

  ngOnInit(): void {
    this.bService.getAllBidders().subscribe(data => {
      this.bidders = data;
    });
  }
}
