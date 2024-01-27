import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SuplierShopService {

  constructor(private db: AngularFireDatabase) { }
  addsupplierShopInfo(obj) {
    return  this.db.list(`/supplierShop/`).push(obj);
   }
    
   updatesupplierShopInfo(id, obj) {
    return this.db.object(`/supplierShop/` + id).update(obj);
   }
   
 getByIdsupplierShopInfo(id):Observable<any>{
  return this.db.list(`/supplierShop/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllsupplierShopInfo() { 
  return this.db.list(`/supplierShop`);
}

  deletesupplierShopInfo(key: string) {
  return this.db.list(`/supplierShop`).remove(key);
}
}
