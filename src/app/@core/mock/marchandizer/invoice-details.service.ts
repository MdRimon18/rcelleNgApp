import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {
  item: Observable<any>;
  items: Observable<any[]>;
  startDate: number;
  endDate: number;
  constructor(private db: AngularFireDatabase) { 

      
    //   db.list(`01632079419/SalesInvoiceDetails/`,
    //  ref => ref.orderByChild('clienName').equalTo('Sujon')).valueChanges().subscribe(res=>{
    //   console.log(res)
    //  });

    //  db.list(`01632079419/SalesInvoiceDetails/`,
    //  ref => ref.orderByChild('invoiceNo').equalTo(3)).valueChanges().subscribe(res=>{
    //   console.log(res)
    //  });

    //  this.startDate = new Date("2022-01-01").getTime();
    //  this.endDate = new Date("2022-12-31").getTime();
    //   db.list(`01632079419/SalesInvoiceDetails/`, 
    //   ref => ref.orderByChild('date')
    //   .startAt(this.startDate).endAt(this.endDate)).valueChanges();

      // db.list(`01814857888/SalesInvoiceDetails/`, ref => ref.orderByChild('entryDate')
      // .startAt('2022-12-20').endAt('2022-12-31')).valueChanges().subscribe(res=>{
      //   console.log(res)
      // });
      // this.db.list(`01814857888/SalesInvoiceDetails/`, ref => ref.orderByChild('clienName')
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
 
    return  this.db.list(`${Company.cName}/SalesInvoiceDetails/`).push(obj);
   }
  
   updateProductInfo(id, obj) {
    return this.db.object(`${Company.cName}/SalesInvoiceDetails/` + id).update(obj);
   }
   
   getByIdInvoiceDetails(id){
    return this.db.object(`${Company.cName}/SalesInvoiceDetails/` + id);
   }


 
getAllProductInfo() { 
  return this.db.list(`${Company.cName}/SalesInvoiceDetails`);
}
getAllGreaterThanZeroDueAmount(){
  return this.db.list(`${Company.cName}/SalesInvoiceDetails`, ref => ref
  .orderByChild('DueAmount')
  .startAt(1));
 
} 
 

  deleteProductInfo(key: string) {
  return this.db.list(`${Company.cName}/SalesInvoiceDetails`).remove(key);
}
getInvoiceByDateRange(startDate,endDate){
 return this.db.list(`${Company.cName}/SalesInvoiceDetails`, ref => ref.orderByChild('entryDate')
      .startAt(startDate).endAt(endDate)).valueChanges();
}
getInvoiceByDateRangeWithSnapShot(startDate,endDate){
  return this.db.list(`${Company.cName}/SalesInvoiceDetails`, ref => ref.orderByChild('entryDate')
       .startAt(startDate).endAt(endDate)).snapshotChanges();
 }
getInvoiceByDate(startDate){
  return this.db.list(`${Company.cName}/SalesInvoiceDetails`, ref => ref.orderByChild('entryDate')
       .startAt(startDate)).valueChanges();
 }
 getInvoiceByDateWithSnapsoot(startDate){
  return this.db.list(`${Company.cName}/SalesInvoiceDetails`, ref => ref.orderByChild('entryDate')
       .startAt(startDate));  
 }
 
 


 addCompanyInvoiceRequest(obj,cName){
  return  this.db.list(`${cName}/CompanyInvoiceRequest/`).push(obj);
 }
 updateCompanyInvoiceRequest(id, obj) {
  return this.db.object(`${Company.cName}/CompanyInvoiceRequest/` + id).update(obj);
 }
 getAllCompanyInvoiceRequest() { 
  return this.db.list(`${Company.cName}/CompanyInvoiceRequest`);
}
getByIdCompanyInvoiceRequest(id){
  return this.db.object(`${Company.cName}/CompanyInvoiceRequest/` + id);
 }

 

}
