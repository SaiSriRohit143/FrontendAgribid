export interface Claim {
    claimId: number;
    claimAmount: number;
    claimStatus: string;
    claimDate: string;
  }
   
  export interface Insurance {
    policyId: number;
    season: string;
    year: number;
    cropName: string;
    sumInsured: number;
    area: number;
    insuranceCompany: string;
    premiumAmount: number;
    premiumRate: number;
    claim?: Claim;
  }
   
   
   