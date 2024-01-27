import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../data/baseUrl';
import { company } from '../data/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService  {
  companyFormData:company;
  constructor(public http:HttpClient) {
   
   }
   getAllCompany():Observable<company[]>{
    return this.http.get<company[]>(BaseURL.apiUrl+'/TblCompanyInfoes');
  }
  addCompany(company:company){
    console.log(company);
    return this.http.post<company[]>(BaseURL.apiUrl+'/TblCompanyInfoes',company);
  }
  updateCompany(company:company){
    return this.http.put(BaseURL.apiUrl+'/TblCompanyInfoes/'+company.compId,company);
  }
  deleteCompany(id: number){
    return this.http.delete(BaseURL.apiUrl+'/TblCompanyInfoes/'+id);
  }
}
