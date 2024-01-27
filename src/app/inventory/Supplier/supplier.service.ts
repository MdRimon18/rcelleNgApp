import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import * as firebase from 'firebase'; 
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private db: AngularFireDatabase) { }
  
  addMySupplierProfileInfo(obj) {
    return  this.db.list(`/${Company.cName}/MySupplierProfile/`).push(obj);
   }
    
   updateMySupplierProfileInfo(id, obj) {
    return this.db.object(`${Company.cName}/MySupplierProfile/` + id).update(obj);
   }
   
 getByIdMySupplierProfileInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/MySupplierProfile/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllMySupplierProfileInfo() { 
  return this.db.list(`${Company.cName}/MySupplierProfile`);
}

  deleteMySupplierProfileInfo(key: string) {
  return this.db.list(`${Company.cName}/MySupplierProfile`).remove(key);
}
}
