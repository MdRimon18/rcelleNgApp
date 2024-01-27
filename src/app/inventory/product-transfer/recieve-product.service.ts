import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class RecieveProductService {

  constructor(private db: AngularFireDatabase) { }

  
  recieveProduct(obj,companyName) {
    
    return  this.db.list(`${companyName}/ProductRecieve/`).push(obj);
   }

   updateRecieveInfo(id, obj) {
    return this.db.object(`${Company.cName}/ProductRecieve/` + id).update(obj);
   }
   
 getByIdRecieveInfo(id):Observable<any>{
  return this.db.object(`${Company.cName}/ProductRecieve/` + id)
  .valueChanges();

 }

 
  getAllRecieveInfo() { 
  return this.db.list(`${Company.cName}/ProductRecieve`);
}
 
  deleteRecieveInfo(key: string) {
  return this.db.list(`${Company.cName}/ProductRecieve`).remove(key);
}




 

}

