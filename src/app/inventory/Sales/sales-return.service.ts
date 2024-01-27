import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class SalesReturnService {

  constructor(private db: AngularFireDatabase) { 
   
  }
  addSalesReturn(obj) {
    
    return  this.db.list(`${Company.cName}/SalesReturn/`).push(obj);
   }

   updateSalesReturn(id, obj) {
    return this.db.object(`${Company.cName}/SalesReturn/` + id).update(obj);
   }
 
 getByIdSalesReturn(id){
  return this.db.object(`${Company.cName}/SalesReturn/` + id);
 }


 
 getAllSalesReturn() { 
  return this.db.list(`${Company.cName}/SalesReturn`);
}
getSalesReturnByDateRangeWithSnapShot(startDate,endDate){
  return this.db.list(`${Company.cName}/SalesReturn`, ref => ref.orderByChild('entryDate')
       .startAt(startDate).endAt(endDate)).snapshotChanges();
 }
  deleteSalesReturn(key: string) {
  return this.db.list(`${Company.cName}/SalesReturn`).remove(key);
}
}
