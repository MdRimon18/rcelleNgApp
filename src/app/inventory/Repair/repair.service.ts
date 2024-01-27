import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class RepairService {
  

   
  constructor(private db: AngularFireDatabase) { }

  
  addRepairInfo(obj) {
   console.log(Company.cName)
    return  this.db.list(`${Company.cName}/RepairInvoiceDetails/`).push(obj);
   }

   updateRepairInfo(id, obj) {
    return this.db.object(`${Company.cName}/RepairInvoiceDetails/` + id).update(obj);
   }
   
 getByIdRepairInfo(id):Observable<any>{
  return this.db.object(`${Company.cName}/RepairInvoiceDetails/` + id)
  .valueChanges();
 }

 
  getAllRepairInfo() { 
  return this.db.list(`${Company.cName}/RepairInvoiceDetails`);
}
 
  deleteRepairInfo(key: string) {
  return this.db.list(`${Company.cName}/RepairInvoiceDetails`).remove(key);
}




 

}
