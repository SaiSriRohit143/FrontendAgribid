export interface Farmer {
    id: number;
        fullName: string;
        contactNo: number;
        emailId: string;
        accountNo: string;
        ifscCode: string;
        landArea: string;
        landAddress: string;
        landPincode: number;
        address :{
            street: string;
            city: string;
            state: string;
            pincode: string;
        }
      
}
