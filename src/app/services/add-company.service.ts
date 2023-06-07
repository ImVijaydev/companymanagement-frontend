import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyService {

  constructor(private http: HttpClient,private toastr: ToastrService) { 
  }

  getCoordinates(address: any) {
    return this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${environment.apiKey}`,);
  }

  addCompany(name: any, address: any, lat: any, lng: any) {
    const data = {
      name: name,
      address: address,
      latitude: lat,
      longitude: lng
    }
    const url = 'http://localhost:3000/companies'
    return this.http.post(url, data);
  }

  updateCompany(companyData: any) {
    const url = `http://localhost:3000/companies/${companyData.id}`;
    this.http.put(url,companyData).subscribe((response: any) =>{
      console.log(response);
      this.toastr.success(response.message)
    }, error =>{
      console.log(error);
    })
  }
}
