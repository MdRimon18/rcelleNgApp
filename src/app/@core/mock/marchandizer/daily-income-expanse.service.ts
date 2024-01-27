import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class DailyIncomeExpanseService {
  
  constructor(private db: AngularFireDatabase) { }
  addProductInfo(obj)  {
    return  this.db.list(`${Company.cName}/DailyIncomeExpanse/`).push(obj);
   }
   addProductInfov2(obj: any): Observable<string> {
    const pushRef: firebase.database.ThenableReference = this.db.list(`${Company.cName}/DailyIncomeExpanse/`).push(obj);
    return from(pushRef).pipe(map(ref => ref.key));
  }
   updateProductInfo(id, obj) {
    return this.db.object(`${Company.cName}/DailyIncomeExpanse/` + id).update(obj);
   }
   
 getByIdProductInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/DailyIncomeExpanse/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }
 getAccountsByDateRange(startDate,endDate){
  return this.db.list(`${Company.cName}/DailyIncomeExpanse`, ref => ref.orderByChild('date')
       .startAt(startDate).endAt(endDate)).valueChanges();
 }
 getAccountsByDateRangeWithSnap(startDate,endDate){
  return this.db.list(`${Company.cName}/DailyIncomeExpanse`, ref => ref.orderByChild('date')
       .startAt(startDate).endAt(endDate)).snapshotChanges();
 }
 getAllProductInfo() { 
  return this.db.list(`${Company.cName}/DailyIncomeExpanse`);
}

  deleteProductInfo(key: string) {
  return this.db.list(`${Company.cName}/DailyIncomeExpanse`).remove(key);
}
}
export class DailyIncomeExpanseOrAccount{
  account:String;
accountHead:String;
date:String;
entryDateTime:String;
purpose:String;
totalExpense: number;

}
