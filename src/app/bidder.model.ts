export interface Bidder {
        fullName: string;
        contactNo: number;
        email: string;
        accountNo: string;
        ifscCode: string;
        address: {
          street: string;
          city: string;
          state: string;
          pincode: string;
        };
}
      
