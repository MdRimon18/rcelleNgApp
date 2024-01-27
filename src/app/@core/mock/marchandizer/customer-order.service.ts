import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  

   
  constructor(private db: AngularFireDatabase) { }

  
  addOrder(obj) {
    console.log('test1',obj)
    return  this.db.list(`${Company.cName}/OrderFromCustomer/`).push(obj);
   }

   updateOrder(id, obj) {
    return this.db.object(`${Company.cName}/OrderFromCustomer/` + id).update(obj);
   }
   
 getByIdOrder(id):Observable<any>{
  return this.db.object(`${Company.cName}/OrderFromCustomer/` + id)
  .valueChanges();
 }

 
  getAllOrder() { 
  return this.db.list(`${Company.cName}/OrderFromCustomer`);
}
getOrdersByDateRangeWithSnapShot(startDate,endDate){
  return this.db.list(`${Company.cName}/OrderFromCustomer`, ref => ref.orderByChild('EntryDate')
       .startAt(startDate).endAt(endDate)).snapshotChanges();
 }
  deleteOrder(key: string) {
  return this.db.list(`${Company.cName}/OrderFromCustomer`).remove(key);
}




 

}

