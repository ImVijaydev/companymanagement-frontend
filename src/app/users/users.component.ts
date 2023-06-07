import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompaniesService } from '../services/companies.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DatePipe]
})
export class UsersComponent implements OnInit{
  users!: any;
  companyId!: number;
  isUsersEmpty: Boolean = false;
  companyName!: String;
  message: String = 'No users found';
  searchValue: String = '';
  isSearched: Boolean = false;
  
  constructor(private usersService: UsersService, private router: Router,private datePipe: DatePipe,private toastr: ToastrService,
    private companiesService: CompaniesService){}

  ngOnInit(): void {
    this.companyId = history.state.companyId;
    if(this.companyId){
      this.onlyShowUsersFromThisCompany(this.companyId);
    }
    else{
      this.fetchUsers();
    }
  }

  onlyShowUsersFromThisCompany(companyId: any){
    this.getCompanyName(companyId);
      this.usersService.getUsersBasedOnCompanyId(companyId).subscribe(response => {
        this.users = response;
      },error => {
        if(error.status == 404){
          this.isUsersEmpty = true;
        }
        console.log(error);
      });
  }

  getCompanyName(companyId: any) {
    this.companiesService.getCompany(companyId).subscribe((response: any) =>{
      this.companyName = response[0].name;
    }, error =>{
      console.log(error);
    })
  }

  goBackToCompanies(){
    this.router.navigate(['/companies']);
  }

  onUpdateClick(user: any){
    this.router.navigate(['/add-user'], { state: { user: user } });
  }

  onDeleteClick(user: any){
   this.usersService.deleteCompany(user.id).subscribe((response: any) =>{
    this.toastr.success(response.message);
    this.fetchUsers();
  },(error: any) => {
    if(error.status == 404){
      this.toastr.error(error.error.error);
    }
    console.log(error);
  });
  }

  fetchUsers() {
    this.usersService.getUsers().subscribe(usersResponse=>{
      this.users = usersResponse;
     },error => {
      if(error.status == 404){
        this.users= [];
      }
       console.log(error);
     });
  }

  onActiveToggleClick(user: any){
    const active = user.active? false: true;
   this.usersService.activeStatus(user.id,active).subscribe((response: any) => {
    this.toastr.success(response.message);
    this.fetchUsers();
  }, (error: any) =>{
    if(error.status == 404){
      this.toastr.error(error.error.error);
    }
    console.log(error);
  });
  }

  isUserActive(user: any) {
    return user.active;
  }

  onMigrateClick(user: any){
    this.router.navigate(['/add-user'], { state: { user: user, isMigrateUser: true } });
  }

  onSearchClick(userId: any){
    this.usersService.getCompany(userId).subscribe((response: any) =>{
      this.users = response;
      this.isSearched = true;
    },(error: any) => {
      if(error.status == 404){
        this.toastr.error(error.error.error);
      }
    });
    this.searchValue = '';
  }

  goBack(){
    this.fetchUsers();
    this.isSearched = false;
  }

  onAddClick(){
    this.router.navigate(['/add-user'],{ state: { companyId: this.companyId }});
  }

}