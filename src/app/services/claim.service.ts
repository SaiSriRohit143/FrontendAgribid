import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../insurance.model';
 
@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://localhost:8084/agribid/api';
 
  constructor(private http: HttpClient) {}
 
//   claimInsurance(policyId: number, claimData: Claim, file: File): Observable<Claim> {
//     const formData = new FormData();
//     formData.append('claim', JSON.stringify(claimData));
//     formData.append('file', file);
//     //const storedPolicyId = localStorage.getItem('policyId');
//     alert(policyId);
//     return this.http.post<Claim>(`${this.apiUrl}/claim/${policyId}`, formData);
// }
 
claimInsurance(claimData: Claim, file: File, policyId?: number): Observable<Claim> {
  const formData = new FormData();
  formData.append('claim', JSON.stringify(claimData));
  formData.append('file', file);
  return this.http.post<Claim>(`${this.apiUrl}/claim/${policyId}`, formData);
}

// getClaimByPolicyId(policyId: number): Observable<any> {
//   return this.http.get(`${this.apiUrl}/insurance/${policyId}`);
// }

getClaimByPolicyId(policyId?: number): Observable<any> {
  // Retrieve policy ID from local storage if not provided
  if (!policyId) {
    const storedPolicyId = localStorage.getItem('policyId');
    if (storedPolicyId) {
      policyId = parseInt(storedPolicyId, 10);
    } else {
      throw new Error('Policy ID is required');
    }
  }
  alert(policyId); // For debugging purposes
  return this.http.get(`${this.apiUrl}/insurance/${policyId}`);
}

}