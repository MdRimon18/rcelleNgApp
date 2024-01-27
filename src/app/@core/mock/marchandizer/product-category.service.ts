import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Company } from '../../data/marchanzider-model/assignCompanyName';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { invoice } from '../../data/marchanzider-model/invoice';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
 invoice:invoice[];
  
  constructor(private db: AngularFireDatabase) { }
  addProductInfo(obj) {
    return  this.db.list(`${Company.cName}/productCategories/`).push(obj);
   }

   updateProductInfo(id, obj) {
    return this.db.object(`${Company.cName}/productCategories/` + id).update(obj);
   }
   
 getByIdProductInfo(id){
  return this.db.object(`${Company.cName}/productCategories/` + id);
  
   
 }

 
 getAllProductInfo() { 
   
  return this.db.list(`${Company.cName}/productCategories`);
}

  deleteProductInfo(key: string) {
  return this.db.list(`${Company.cName}/productCategories`).remove(key);
}
}
