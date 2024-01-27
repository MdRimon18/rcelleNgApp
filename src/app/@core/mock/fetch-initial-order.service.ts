import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../data/baseUrl';
import { OrderInfo } from '../data/marchanzider-model/order-info.model';

@Injectable({
  providedIn: 'root'
})
export class FetchInitialOrderService {

  constructor(private http:HttpClient) { }
  getInitialAllOrderList(): Observable<OrderInfo[]> {
    return this.http.get<any[]>(BaseURL.apiUrl+ '/TblInitialOrders');
  }
  addInitialAllOrderList(orderInfo:OrderInfo){
    return this.http.post<OrderInfo[]>(BaseURL.apiUrl+'/TblInitialOrders',orderInfo);
  }
  updateInitialAllOrder(orderInfo:OrderInfo){
    return this.http.put(BaseURL.apiUrl+'/TblInitialOrders/'+orderInfo.orderAutoId,orderInfo);
  }
  deleteInitialAllOrder(id: number){
    return this.http.delete(BaseURL.apiUrl+'/TblInitialOrders/'+id);
  }
}
