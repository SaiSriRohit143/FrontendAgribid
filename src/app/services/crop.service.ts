import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crop } from '../crop.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {

      private apiUrl = 'http://localhost:8090/agribid/farmer-service/findcrops';
  
    constructor(private http: HttpClient) { }
  
    getAllCrops(): Observable<Crop[]> {
      return this.http.get<Crop[]>(this.apiUrl);
    }

    private cropsSubject = new BehaviorSubject<any[]>([]);
  crops$ = this.cropsSubject.asObservable();

  setCrops(crops: any[]) {
    this.cropsSubject.next(crops);
  }

}
