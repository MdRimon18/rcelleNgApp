import { Injectable } from '@angular/core';
import { buyer } from '../data/buyer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../data/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class BuyerService  {
  BuyerFormData:buyer;

  constructor(public http:HttpClient) {
  
   }
   getAllBuyer():Observable<buyer[]>{
    return this.http.get<buyer[]>(BaseURL.apiUrl+'/BuyerInfoes/Index');
  } 
  addBuyer(buyer:buyer){
    console.log(buyer);
    return this.http.post<buyer[]>(BaseURL.apiUrl+'/BuyerInfoes',buyer);
  }
  updateBuyer(buyer:buyer){
    return this.http.put(BaseURL.apiUrl+'/BuyerInfoes/'+buyer.buyerId,buyer);
  }
  deleteBuyer(id: number){
    return this.http.delete(BaseURL.apiUrl+'/BuyerInfoes/'+id);
  }
}
