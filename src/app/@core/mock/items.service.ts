import { Injectable } from '@angular/core';
import { items } from '../data/items';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends items {
  readonly APIUrl="http://localhost:4186/api";
  constructor(public http:HttpClient) { 
    super();
  }
  getitemsDropDownValues():Observable<any>{
    return this.http.get<items[]>(this.APIUrl+'/ItemDetailsOrderEntries');
  }
}
