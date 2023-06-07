import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-company', pathMatch: 'full' },
  {path: 'add-company', component: AddCompanyComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'company-details', component: CompanyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
