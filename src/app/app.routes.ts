import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { FarmerRegistrationComponent } from './components/farmer-registration/farmer-registration.component';
import { BidderRegistrationComponent } from './components/bidder-registration/bidder-registration.component';
import { FarmerHomeComponent } from './components/farmer-home/farmer-home.component';
import { BidderHomeComponent } from './components/bidder-home/bidder-home.component';
import { PlaceRequestComponent } from './components/place-request/place-request.component';
import { SoldhistoryComponent } from './components/soldhistory/soldhistory.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { BidderLoginComponent } from './components/bidder-login/bidder-login.component';
import { FarmerLoginComponent } from './components/farmer-login/farmer-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FarmerListComponent } from './components/farmer-list/farmer-list.component';
import { BidderListComponent } from './components/bidder-list/bidder-list.component';
import { CropListComponent } from './components/crop-list/crop-list.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { ClaimComponent } from './components/claim/claim.component';
import path from 'path';
import { MainloginComponent } from './components/mainlogin/mainlogin.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'contact', component: ContactUsComponent},
    {path: 'fregister', component: FarmerRegistrationComponent},
    {path: 'bregister', component: BidderRegistrationComponent},
    {path: 'fhome' , component:FarmerHomeComponent},
    {path: 'bhome' , component:BidderHomeComponent},
    {path: 'placerequest',component:PlaceRequestComponent},
    {path: 'soldhistory' , component:SoldhistoryComponent},
    {path: 'marketplace' , component:MarketplaceComponent},
    {path: 'bidderlogin' , component:BidderLoginComponent},
    {path: 'farmerlogin' , component:FarmerLoginComponent},
    {path: 'ahome' , component:AdminHomeComponent},
    {path: 'farmerdata' , component:FarmerListComponent},
    {path: 'bidderdata' , component:BidderListComponent},
    {path: 'cropdata', component:CropListComponent},
    {path: 'insurance', component:InsuranceComponent},
    {path: 'claim' , component:ClaimComponent}  ,
    {path: 'mlogin' , component: MainloginComponent}
];
