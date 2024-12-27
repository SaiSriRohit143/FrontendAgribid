import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insurance } from '../insurance.model';
 
@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = 'http://localhost:8084/agribid/api/insurance';
 
  constructor(private http: HttpClient) {}
 
  // getInsuranceByPolicyId(policyId: number): Observable<Insurance> {
  //   return this.http.get<Insurance>(`${this.apiUrl}/policy/${policyId}`);
  // }
 
  applyInsurance(insuranceData: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(`${this.apiUrl}/apply`, insuranceData);
  }
}
 
 
 
 