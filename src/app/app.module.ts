import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddCompanyComponent } from './add-company/add-company.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { MapComponent } from './map/map.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddCompanyComponent,
    AddUserComponent,
    CompaniesComponent,
    UsersComponent,
    CompanyDetailsComponent,
    MapComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
