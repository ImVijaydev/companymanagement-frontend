import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies() {
    const url = 'http://localhost:3000/companies';
    return this.http.get(url)
  }

  deleteCompany(companyId: any) {
    const url = `http://localhost:3000/companies/${companyId}`;
    return this.http.delete(url);
  }

  deleteCompanyId(companyId: any) {
    const url = `http://localhost:3000/user/${companyId.id}/deleteCompany`;
    return this.http.put(url,companyId);
  }
  getCompany(companyId: any) {
    const url = `http://localhost:3000/companies/${companyId}`;
    return this.http.get(url);
  }

}
