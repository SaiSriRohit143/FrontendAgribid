import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Farmer } from '../farmer.model';




export class Crops {
  postedDateTime: string;
  cropName: string;
  quantity: number;
  // msp: number;
  soldPrice: number;
  status: string;

  constructor(date: string, cropName: string, quantity: number, soldPrice: number,status: string) {
    this.postedDateTime = date;
    this.cropName = cropName;
    this.quantity = quantity;
    this.soldPrice = soldPrice;
    this.status = status; // Default status
  }

  getTotalPrice(): number {
    return this.quantity * this.soldPrice;
  }
}

export interface cropDetails {
  cropType: string;
  cropName: string;
  currentBid: number;
  basePrice: number;
  postedDateTime: Date;
}

interface Crop {
  cid: number;
  cropType: string;
  cropName: string;
  basePrice: number;
  currentBid: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private baseUrl = 'http://localhost:8081/agribid/farmer-service';


  constructor(private http: HttpClient) { }

  getCropsByFarmerId1(): Observable<Crops[]> {
    const farmerId = localStorage.getItem('farmerId');
    if (!farmerId) {
      throw new Error('Farmer is not logged in');
    }

    return this.http.get<Crops[]>(`${this.baseUrl}/farmer/${farmerId}`);
  }

  getCropsByFarmerId(): Observable<cropDetails[]> {
    const farmerId = localStorage.getItem('farmerId');
    if (!farmerId) {
      throw new Error('Farmer is not logged in');
    }

    return this.http.get<cropDetails[]>(`${this.baseUrl}/crops/farmer/${farmerId}`);
  }

  getCrops(): Observable<Crop[]> {
    return this.http.get<Crop[]>(`${this.baseUrl}/crops`);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // Log the response to check its structure
        const farmerId = response;
        localStorage.setItem('farmerId', farmerId);
        //alert(localStorage.getItem('farmerId'));
      })
    );
  }

  sellCrop(cropDetails: any, soilPHCertificate: File): Observable<any> {
    const farmerId = localStorage.getItem('farmerId');
    if (!farmerId) {
      throw new Error('Farmer is not logged in');
    }

    const formData: FormData = new FormData();
    formData.append('crop', JSON.stringify(cropDetails));
    formData.append('soilPHCertificate', soilPHCertificate);

    return this.http.post(`${this.baseUrl}/sell/${farmerId}`, formData);
  }

  updatePassword(updateCredentials: { emailId: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-password`, updateCredentials, { responseType: 'text' });
  }


  //REGISTRATION METHOD FOR FARMER
  // Method to handle the form data and file uploads
  register(farmer: any, files: { aadhaar: File, pan: File, certificate: File }): Observable<any> {
    const formData: FormData = new FormData();

    // Append form details as a JSON string
    formData.append('farmer', JSON.stringify(farmer));

    // Append file inputs with correct keys
    formData.append('aadhaar', files.aadhaar);
    formData.append('pan', files.pan);
    formData.append('certificate', files.certificate);

    // Log formData for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // POST request to backend API
    return this.http.post(`${this.baseUrl}/registration`, formData).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );


  }

  updateCropStatus(cropId: number, status: string): Observable<any> {
    const payload = { status: status };
    return this.http.put(`${this.baseUrl}/crops/${cropId}/status`, payload);
  }
}