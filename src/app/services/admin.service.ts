import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farmer } from '../farmer.model';
import { Bidder } from '../bidder.model';
import { Crop } from '../crop.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8081/agribid/farmer-service/findall';
  private apiUrl1 = 'http://localhost:8083/agribid/bidder-service/findall';
  private apiUrl2 = 'http://localhost:8081/agribid/farmer-service/findcrops';

  constructor(private http: HttpClient) { }

  getAllFarmers(): Observable<Farmer[]> {
    return this.http.get<Farmer[]>(this.apiUrl);
  }

  getAllCrops(): Observable<Crop[]> {
    return this.http.get<Crop[]>(this.apiUrl2);
  }

  private cropsSubject = new BehaviorSubject<any[]>([]);
  crops$ = this.cropsSubject.asObservable();

  setCrops(crops: any[]) {
    this.cropsSubject.next(crops);
  }

  getAllBidders(): Observable<Bidder[]> {
    return this.http.get<Bidder[]>(this.apiUrl1);
  }
}
