import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class MyShopEmpService {

  constructor(private db: AngularFireDatabase) { }
  
  addMyEmpProfileInfo(obj) {
    return  this.db.list(`/${Company.cName}/MyEmpProfile/`).push(obj);
   }
    
   updateMyEmpProfileInfo(id, obj) {
    return this.db.object(`${Company.cName}/MyEmpProfile/` + id).update(obj);
   }
   
 getByIdMyEmpProfileInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/MyEmpProfile/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllMyEmpProfileInfo() { 
  return this.db.list(`${Company.cName}/MyEmpProfile`);
}

  deleteMyEmpProfileInfo(key: string) {
  return this.db.list(`${Company.cName}/MyEmpProfile`).remove(key);
}
}
