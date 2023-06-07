import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyDetailsService } from '../services/company-details.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  companyData!: any;
  userList!: any;

  constructor(private companyDetailsService: CompanyDetailsService,private router:Router){}

   ngOnInit(): void{
    this.companyData = history.state.company;
  }

  onUserListClick(){
    this.router.navigate(['/users'], {state: { companyId: this.companyData.id }});
  }

  goBack(){
    this.router.navigate(['/companies']);
  }
}
