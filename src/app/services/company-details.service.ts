import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {
  constructor(private http: HttpClient) { }

  fetchUsers(company_id: any) {
    return this.http.get(`http://localhost:3000/users/${company_id}`)
  }

}
