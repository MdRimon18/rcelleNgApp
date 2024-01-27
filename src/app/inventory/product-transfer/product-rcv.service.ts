import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class ProductRcvService {
 
  constructor(private db: AngularFireDatabase) { }

  
  addProductRcv(obj,cmpny) {
    
    return  this.db.list(`${cmpny}/ProductRcv/`).push(obj);
   }  

   updateProductRcv(id, obj) {
    return this.db.object(`${Company.cName}/ProductRcv/` + id).update(obj);
   }
   
 getByIdProductRcv(id):Observable<any>{
  return this.db.object(`${Company.cName}/ProductRcv/` + id)
  .valueChanges();

 }

 
  getAllProductRcv() { 
  return this.db.list(`${Company.cName}/ProductRcv`);
}
 
  deleteProductRcv(key: string) {
  return this.db.list(`${Company.cName}/ProductRcv`).remove(key);
}




 

}
