import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Crop {
  bidderId: number;
  cid: number;
  cropType: string;
  cropName: string;
  basePrice: number;
  currentBid: number;
  postedDateTime: string;
  newBid?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationBService {

  private baseUrl1 = 'http://localhost:8083/agribid/bidder-service';
  private baseUrl = 'http://localhost:8081/agribid/farmer-service';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl1}/login`, credentials, { responseType: 'text' }).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // Log the response to check its structure
        const bidderId = response;
        localStorage.setItem('bidderId', bidderId);
        //alert(localStorage.getItem('bidderId'));
      })
    );
  }

  updatePassword(updateCredentials: { email: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl1}/update-password`, updateCredentials, { responseType: 'text' });
  }

  registerBidder(bidder: any, files: { aadhaar: File, pan: File, tradeLicense: File }): Observable<any> {
    const formData: FormData = new FormData();

    // Append form details as a JSON string
    formData.append('bidder', JSON.stringify(bidder));

    // Append file inputs with correct keys
    formData.append('aadhaar', files.aadhaar);
    formData.append('pan', files.pan);
    formData.append('tradeLicense', files.tradeLicense);

    // Log formData for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // POST request to backend API
    return this.http.post(`${this.baseUrl1}/registration`, formData).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  getCrops(): Observable<Crop[]> {
    return this.http.get<Crop[]>(`${this.baseUrl}/crops`).pipe(
      retry(3), // Retry up to 3 times before failing
      catchError(error => {
        console.error('Error fetching crops:', error);
        return throwError(error);
      })
    );
  }

  updateCurrentBid(cid: number, currentBid: number): Observable<string> {
  const bidderId = localStorage.getItem('bidderId');
  if (!bidderId) {
    throw new Error('Bidder ID not found in local storage');
  }

  const params = new HttpParams().set('currentBid', currentBid.toString());
  return this.http.put<string>(`${this.baseUrl1}/crops/${cid}/${bidderId}/currentBid`, null, {
    params,
    responseType: 'text' as 'json'
  }).pipe(
    catchError(error => {
      console.error('Error updating bid:', error);
      return throwError(error);
    })
  );
}
}
