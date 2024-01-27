import { Injectable } from '@angular/core';
import { PreCosting } from '../../data/marchanzider-model/pre-costing.model';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../data/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrecostingService {

  constructor(public http:HttpClient) { }
  getAllPrecosting():Observable<PreCosting[]>{
    return this.http.get<PreCosting[]>(BaseURL.apiUrl+'/PreCostings');
  }
  addPrecosting(preCosting:PreCosting){
    console.log(preCosting);
    return this.http.post<PreCosting[]>(BaseURL.apiUrl+'/PreCostings',preCosting);
  }
  updatePrecosting(preCosting:PreCosting){
    return this.http.put(BaseURL.apiUrl+'/PreCostings/'+preCosting.precostingId,preCosting);
  }
  deletePrecosting(id: number){
    return this.http.delete(BaseURL.apiUrl+'/PreCostings/'+id);
  }
}
