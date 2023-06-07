import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUsers() {
    const url = 'http://localhost:3000/user';
    return this.http.get(url);
  }

  getUsersBasedOnCompanyId(id: any){
    const url = `http://localhost:3000/user/getUsersBasedOnCompanyId/${id}`;
    return this.http.get(url);
  }

  deleteCompany(id: any) {
    const url = `http://localhost:3000/user/${id}`;
     return this.http.delete(url);
}

getCompany(userId: any) {
  const url = `http://localhost:3000/user/${userId}`;
  return this.http.get(url);
}

activeStatus(id:any, active: any) {
  const url = `http://localhost:3000/user/${id}/toggleActiveStatus`;
  return this.http.put(url,{"active" : active});
}

}
