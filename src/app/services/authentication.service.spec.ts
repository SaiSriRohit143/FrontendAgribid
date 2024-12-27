import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = ''; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  register(formData: any, files: { aadhaar: File, pan: File, certificate: File }): Observable<string> {
    const form = new FormData();
    form.append('emailId', formData.emailId);
    form.append('fullName', formData.fullName);
    form.append('password', formData.password);
    form.append('confirmPassword', formData.confirmPassword);
    form.append('contactNo', formData.contactNo);
    form.append('accountNo', formData.accountNo);
    form.append('ifscCode', formData.ifscCode);
    form.append('landArea', formData.landArea);
    form.append('landAddress', formData.landAddress);
    form.append('landPincode', formData.landPincode);
    form.append('street', formData.address.street);
    form.append('city', formData.address.city);
    form.append('state', formData.address.state);
    form.append('pincode', formData.address.pincode);
    form.append('aadhaar', files.aadhaar);
    form.append('pan', files.pan);
    form.append('certificate', files.certificate);

    return this.http.post<string>(`${this.baseUrl}/register-farmer`, form);
  }
}
