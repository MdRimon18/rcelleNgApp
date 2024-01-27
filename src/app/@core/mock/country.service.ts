import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryInfo } from '../data/country-info.model';
import { BaseURL } from '../data/baseUrl';
import { HttpClient } from '@angular/common/http';
import { location } from '../data/location';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }
  getAllCountry():Observable<any>{
    return this.http.get<location[]>(BaseURL.apiUrl+'/LocationInfoes/Index');
  }
  addCompany(location:location){
    return this.http.post<location[]>(BaseURL.apiUrl+'/TblCompanyInfoes',location);
  }
}
