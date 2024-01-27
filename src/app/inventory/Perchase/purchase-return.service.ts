import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnService {

  constructor(private db: AngularFireDatabase) { 
   
  }
  addPurchaseReturn(obj) {
    
    return  this.db.list(`${Company.cName}/PurchaseReturn/`).push(obj);
   }

   updatePurchaseReturn(id, obj) {
    return this.db.object(`${Company.cName}/PurchaseReturn/` + id).update(obj);
   }
   
 
 getByIdPurchaseReturn(id){
  return this.db.object(`${Company.cName}/PurchaseReturn/` + id);
 }
 
 getAllPurchaseReturn() { 
  return this.db.list(`${Company.cName}/PurchaseReturn`);
}
getPurchaseReturnByDateRangeWithSnapShot(startDate,endDate){
  return this.db.list(`${Company.cName}/SalesReturn`, ref => ref.orderByChild('entryDate')
       .startAt(startDate).endAt(endDate)).snapshotChanges();
 }
  deletePurchaseReturn(key: string) {
  return this.db.list(`${Company.cName}/PurchaseReturn`).remove(key);
}
}
