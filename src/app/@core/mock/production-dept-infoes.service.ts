import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductionDeptInfoes } from '../data/ProductionDeptInfoes';
@Injectable({
  providedIn: 'root'
})
export class ProductionDeptInfoesService extends ProductionDeptInfoes {
  readonly APIUrl="http://localhost:4186/api"
  constructor(public http:HttpClient) { 
    super();
  }
  getProductionDeptInfoesDDL():Observable<any>{
    return this.http.get<ProductionDeptInfoes[]>(this.APIUrl+'/ProductionDeptInfoes/Index');
  }
}
