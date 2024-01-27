import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class PurchaseMoneyRecitService {

   
  constructor(private db: AngularFireDatabase) { }

  
  addMoneyRecitPurchase(obj) {
   
    return  this.db.list(`${Company.cName}/MoneyRecitPurchase/`).push(obj);
   }

   updateMoneyRecitPurchase(id, obj) {
    return this.db.object(`${Company.cName}/MoneyRecitPurchase/` + id).update(obj);
   }
   
 getByIdMoneyRecitPurchase(id):Observable<any>{
  return this.db.list(`${Company.cName}/MoneyRecitPurchase/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
  getAllMoneyRecitPurchase() { 
  return this.db.list(`${Company.cName}/MoneyRecitPurchase`);
}
 
  deleteMoneyRecitPurchase(key: string) {
  return this.db.list(`${Company.cName}/MoneyRecitPurchase`).remove(key);
}




 

}
