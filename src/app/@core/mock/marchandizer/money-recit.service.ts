import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class MoneyRecitService {
  

   
  constructor(private db: AngularFireDatabase) { }

  
  addMoneyRecit(obj) {
   
    return  this.db.list(`${Company.cName}/MoneyRecit/`).push(obj);
   }

   updateMoneyRecit(id, obj) {
    return this.db.object(`${Company.cName}/MoneyRecit/` + id).update(obj);
   }
   
 getByIdMoneyRecit(id):Observable<any>{
  return this.db.list(`${Company.cName}/MoneyRecit/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
  getAllMoneyRecit() { 
  return this.db.list(`${Company.cName}/MoneyRecit`);
}
 
  deleteMoneyRecit(key: string) {
  return this.db.list(`${Company.cName}/MoneyRecit`).remove(key);
}




 

}
