import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError, count, map } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class PriceQuotationService {
  item: Observable<any>;
  items: Observable<any[]>;
  startDate: number;
  endDate: number;
   
  constructor(private db: AngularFireDatabase) { 

      
    //   db.list(`01632079419/PriceQuotations/`,
    //  ref => ref.orderByChild('clienName').equalTo('Sujon')).valueChanges().subscribe(res=>{
    //   console.log(res)
    //  });

    //  db.list(`01632079419/PriceQuotations/`,
    //  ref => ref.orderByChild('invoiceNo').equalTo(3)).valueChanges().subscribe(res=>{
    //   console.log(res)
    //  });

    //  this.startDate = new Date("2022-01-01").getTime();
    //  this.endDate = new Date("2022-12-31").getTime();
    //   db.list(`01632079419/PriceQuotations/`, 
    //   ref => ref.orderByChild('date')
    //   .startAt(this.startDate).endAt(this.endDate)).valueChanges();

      // db.list(`01814857888/PriceQuotations/`, ref => ref.orderByChild('entryDate')
      // .startAt('2022-12-20').endAt('2022-12-31')).valueChanges().subscribe(res=>{
      //   console.log(res)
      // });
      // this.db.list(`01814857888/PriceQuotations/`, ref => ref.orderByChild('clienName')
      // .equalTo('Sujon').orderByChild('PaidAmount').startAt(
      //   2160)).valueChanges().subscribe(res=>{
      //        console.log(res)
      //      });

          //  this.items = this.afDb.list('/items', ref => ref.orderByChild('category')
          //  .equalTo('books').orderByChild('price').startAt(20).endAt(null));




          //  this.items = this.afDb.list('/items').snapshotChanges().pipe(
          //   map(items => {
          //     return items.map(item => {
          //       let data = item.payload.val();
          //       data.category = data.category.trim();
          //       data.name = data.name.trim();
          //       return {...data};
          //     });
          //   })
          // );
          
  }

  
  addProductInfo(obj) {
 
    return  this.db.list(`${Company.cName}/PriceQuotations/`).push(obj);
   }

   updateProductInfo(id, obj) {
    return this.db.object(`${Company.cName}/PriceQuotations/` + id).update(obj);
   }
   
 getByIdProductInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/PriceQuotations/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
  getAllProductInfo() { 
  return this.db.list(`${Company.cName}/PriceQuotations`);
}
 
  deleteProductInfo(key: string) {
  return this.db.list(`${Company.cName}/PriceQuotations`).remove(key);
}


  
countItems() {
  return  this.db.list(`${Company.cName}/PriceQuotations`).valueChanges();
}
deleteTable() {
  this.db.object(`${Company.cName}/PriceQuotations`).remove();
}

}
