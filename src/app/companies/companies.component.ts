import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit{
  companies!: any;
  isButtonClicked: boolean = false;
  searchValue: String = '';
  isSearched: Boolean = false;
  constructor(private companiesService: CompaniesService,private router: Router,private toastr: ToastrService){}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.companiesService.getCompanies().subscribe(companiesResponse=>{
      this.companies = companiesResponse;
     },error => {
       console.log(error);
     });
  }

  getCompanyDetail(company: any){
    if(!this.isButtonClicked){
      this.router.navigate(['/company-details'], { state: { company: company } });
    }
    this.isButtonClicked = false;
  }

  onUpdateClick(company: any){
    this.router.navigate(['/add-company'], { state: { company: company } });
    this.isButtonClicked = true;
  }

  onDeleteClick(companyId: any){
    this.deleteCompanyIdFromUsers(companyId);
    this.executeDeleteCompany(companyId);
    this.isButtonClicked = true;
  }

  deleteCompanyIdFromUsers(companyId: any){
    this.companiesService.deleteCompanyId(companyId).subscribe(response =>{
      console.log(response);
    },error => {
      console.log(error);
    });
  }

  executeDeleteCompany(companyId: any){
    this.companiesService.deleteCompany(companyId.id).subscribe((response: any) =>{
      this.toastr.success(response.message)
      this.fetchCompanies();
    },(error: any) => {
      if(error.status == 404){
        this.toastr.error(error.error.error);
      }
      console.log(error);
    });
  }

  onSearchClick(companyId: any){
    this.companiesService.getCompany(companyId).subscribe((response: any) =>{
      this.companies = response;
      this.isSearched = true;
    },(error: any) => {
      if(error.status == 404){
       this.toastr.error(error.error.error);
       console.log(error);
      }
    });
    this.searchValue = '';
  }

  goBack(){
    this.fetchCompanies();
    this.isSearched = false;
  }

}
