import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class PurchaseInvoiceDetailsService {

  constructor(private db: AngularFireDatabase) { }
  
  addpurchaseInvDtlsInfo(obj) {
    return  this.db.list(`/${Company.cName}/purchaseInvDtls/`).push(obj);
   }
    
   updatepurchaseInvDtlsInfo(id, obj) {
    return this.db.object(`${Company.cName}/purchaseInvDtls/` + id).update(obj);
   }
   
 

 
 getAllpurchaseInvDtlsInfo() { 
  return this.db.list(`${Company.cName}/purchaseInvDtls`);
}
getByIdpurchaseInvDtlsInfo(id){
  return this.db.object(`${Company.cName}/purchaseInvDtls/` + id);
 }

  deletepurchaseInvDtlsInfo(key: string) {
  return this.db.list(`${Company.cName}/purchaseInvDtls`).remove(key);
}
getInvoiceByDateRange(startDate,endDate){
  return this.db.list(`${Company.cName}/purchaseInvDtls`, ref => ref.orderByChild('entryDate')
       .startAt(startDate).endAt(endDate)).valueChanges();
 }
 getInvoiceByDateRangeWithSnap(startDate,endDate){
  return this.db.list(`${Company.cName}/purchaseInvDtls`, ref => ref.orderByChild('entryDate')
       .startAt(startDate).endAt(endDate)).snapshotChanges();
 }
 
}
