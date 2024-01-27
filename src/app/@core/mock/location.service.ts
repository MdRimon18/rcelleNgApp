import { Injectable } from '@angular/core';
import { location } from '../data/location';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../data/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LocationService   {

  constructor(public http:HttpClient) {
    
   }
  getAllLocations():Observable<any>{
    return this.http.get<location[]>(BaseURL.apiUrl+'/LocationInfoes/Index');
  }
  addLocation(location:location){
    console.log(location);
    return this.http.post<location[]>(BaseURL.apiUrl+'/LocationInfoes',location);
  }
  updateLocation(location:location){
    return this.http.put(BaseURL.apiUrl+'/LocationInfoes/'+location.locationId,location);
  }
  deleteLocation(id: number){
    return this.http.delete(BaseURL.apiUrl+'/LocationInfoes/'+id);
  }
}
