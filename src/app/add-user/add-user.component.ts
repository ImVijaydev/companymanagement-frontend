import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserService } from '../services/add-user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [DatePipe]
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  companyDetails!: any;
  updatedUserData!: any;
  isUpdateUser: Boolean = false;
  company!: any;
  isMigrateUser: Boolean = false;
  isCompanyId!: Boolean;
  isLoading: Boolean = false;

  constructor(private formBuilder: FormBuilder, private addUserService: AddUserService,
    private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getAllCompanyDetails();
    const updatedUserData = history.state.user;
    const isMigrateUser = history.state.isMigrateUser;
    this.isCompanyId = history.state.companyId;
    if(updatedUserData){
      this.getUpdatedUserData(updatedUserData);
    }
    if(isMigrateUser){
      this.isMigrateUser = isMigrateUser;
    }
    this.userForm = this.formBuilder.group({
      firstName: [{value: '', disabled: this.isMigrateUser}, [Validators.required]],
      lastName: [{value: '', disabled: this.isMigrateUser}, [Validators.required]],
      email: [{value: '', disabled: this.isMigrateUser}, [Validators.required, Validators.email]],
      designation: [{value: '', disabled: this.isMigrateUser}, [Validators.required]],
      dateOfBirth: [{value: '', disabled: this.isMigrateUser}, [Validators.required]],
      companyName: [{value: '', disabled: this.isCompanyId},[Validators.required]]
    });
  }

  getUpdatedUserData(updatedUserData: any){
    this.isUpdateUser = true;
    this.updatedUserData = updatedUserData;
    this.updatedUserData.date_of_birth = this.changeDateFormat(this.updatedUserData.date_of_birth);
  }

  onSubmit(){
    this.isLoading = true;
    const formattedDate = this.changeDateFormat(this.userForm.value.dateOfBirth);
    const userdata = this.getUserData(formattedDate);
    if(this.isMigrateUser){
      this.migrateUsers(this.updatedUserData);
    }
    else if(this.isUpdateUser){
     this.updateUsers(this.updatedUserData);
    }
    else{
      this.postUsers(userdata);
    }
  }

  getUserData(formattedDate: any){
    return {
      first_name : this.userForm.value.firstName,
       last_name : this.userForm.value.lastName,
       email : this.userForm.value.email,
       designation : this.userForm.value.designation,
       date_of_birth : formattedDate,
       company_id : this.isCompanyId? this.company.id : this.userForm.value.companyName
    }
  }

  migrateUsers(updatedUserData: any) {
    this.addUserService.migrateUser(updatedUserData);
    this.isLoading = false;
    this.router.navigate(['/users']);
  }

  updateUsers(updatedUserData: any) {
    this.addUserService.updateUser(updatedUserData);
    this.isLoading = false;
    this.router.navigate(['/users']);
  }

  getAllCompanyDetails() {
    this.addUserService.fetchCompanyDetails().subscribe(response=> {
      this.companyDetails = response;
      if(this.isUpdateUser){
        this.findCompanyName(this.updatedUserData.company_id);
      }
      else if(this.isCompanyId){
        this.findCompanyName(this.isCompanyId);
      }
    },error => {
      console.log(error);
    })
    }

  changeDateFormat(dateOfBirth: Date){
    const formattedDate = this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd');
    return formattedDate;
  }

  postUsers(data: any){
    this.addUserService.addUsers(data);
    this.isLoading = false;
    this.router.navigate(['/users']);
  }

  findCompanyName(company_id: any) {
    this.company = this.companyDetails.find((company: any) =>{
      return company.id === company_id;
    })
  }
}

