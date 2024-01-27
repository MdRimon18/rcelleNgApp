import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class DeuPaymentDetailsService {
  
  constructor(private db: AngularFireDatabase) { }
  addProductInfo(obj) {
    return  this.db.list(`${Company.cName}/DeuPaymentDetails/`).push(obj);
   }

   updateProductInfo(id, obj) {
    return this.db.object(`${Company.cName}/DeuPaymentDetails/` + id).update(obj);
   }
   
 getByIdProductInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/DeuPaymentDetails/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllProductInfo() { 
  return this.db.list(`${Company.cName}/DeuPaymentDetails`);
}

  deleteProductInfo(key: string) {
  return this.db.list(`${Company.cName}/DeuPaymentDetails`).remove(key);
}
}
