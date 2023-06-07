import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddCompanyService } from '../services/add-company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  companyForm!: FormGroup;
  isUpdateCompany:boolean = false;
  updatedCompanyData!: any;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private addCompanyService: AddCompanyService,private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    const updatedCompanyData = history.state.company;
    if(updatedCompanyData){
      this.getUpdatedCompanyData(updatedCompanyData);
    }
    // console.log(updatedCompanyData)
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      companyAddress: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getUpdatedCompanyData(updatedCompanyData: any){
    this.isUpdateCompany = true;
      this.updatedCompanyData = updatedCompanyData;
  }

  onSubmit(): void {
    this.isLoading = true;
    const name = this.companyForm.value.companyName;
    const address = this.companyForm.value.companyAddress;
    this.fetchCoordinatesFromService(name,address);
     
  }

  fetchCoordinatesFromService(name: String, address: String){
    this.addCompanyService.getCoordinates(address).subscribe((coordinates: any) => {
      console.log(coordinates);
      const {lat,lng} = coordinates.results[0].geometry;
      if(this.isUpdateCompany){
        this.updateCompany(this.updatedCompanyData);
      }
      else{
        this.postCompany(name,address,lat,lng);
      }
    });
  }

  postCompany(name: String,address: String,lat:any,lng:any){
    this.addCompanyService.addCompany(name,address,lat,lng).subscribe((response: any) => {
        this.toastr.success(response.message);
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading=false;
      }
    );
    this.router.navigate(['/companies']);
  }

  updateCompany(updatedCompanyData: any){
    this.addCompanyService.updateCompany(updatedCompanyData);
    this.isLoading = false;
    this.router.navigate(['/companies']);
  }
}
