import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  migrateUser(usersData: any) {
    const url = `http://localhost:3000/user/${usersData.id}/migrateUser`;
    this.http.put(url,usersData).subscribe((response: any) =>{
      this.toastr.success(response.message);
    }, error =>{
      if(error.state == 404){
        this.toastr.error(error.error.error);
      }
      console.log(error);
    })
  }

  updateUser(usersData: any) {
    const url = `http://localhost:3000/user/${usersData.id}`;
    this.http.put(url,usersData).subscribe((response: any) =>{
      this.toastr.success(response.message)
    }, error =>{
      if(error.state == 404){
        this.toastr.error(error.error.error);
      }
      console.log(error);
    })
  }

  fetchCompanyDetails(){
    return this.http.get('http://localhost:3000/companies');
  }

  addUsers(data: any) {
    const url = 'http://localhost:3000/user'
    this.http.post(url, data).subscribe((response: any) => {
        this.toastr.success(response.message)
      },
      error => {
        console.error(error);
      }
    );
  }

}
