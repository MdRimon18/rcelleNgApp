import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class PageMenuService {

  constructor(private db: AngularFireDatabase) { }
  addpageMenu(obj,userType) {
    return  this.db.list(`pageMenu/${userType}`).push(obj);
   }

   updatepageMenu(id, obj,userType) {
    return this.db.object(`pageMenu/${userType}` + id).update(obj);
   }
   
 getByIdpageMenu(id,userType):Observable<any>{
  return this.db.list(`pageMenu/${userType}` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllpageMenu(userType) { 
  return this.db.list(`pageMenu/${userType}`);
}

  deletepageMenu(key: string,userType) {
  return this.db.list(`pageMenu/${userType}`).remove(key);
}
}
