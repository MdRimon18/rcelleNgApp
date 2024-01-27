import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class ProductTransferService {
  

   
  constructor(private db: AngularFireDatabase) { }

  
  addSendingProduct(obj) {
    
    return  this.db.list(`${Company.cName}/ProductTransfer/`).push(obj);
   }

   updateTransferInfo(id, obj) {
    return this.db.object(`${Company.cName}/ProductTransfer/` + id).update(obj);
   }
   
 getByIdTransferInfo(id):Observable<any>{
  return this.db.object(`${Company.cName}/ProductTransfer/` + id)
  .valueChanges();

 }

 
  getAllTransferInfo() { 
  return this.db.list(`${Company.cName}/ProductTransfer`);
}
 
  deleteTransferInfo(key: string) {
  return this.db.list(`${Company.cName}/ProductTransfer`).remove(key);
}




 

}
