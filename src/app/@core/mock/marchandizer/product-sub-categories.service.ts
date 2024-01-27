import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Company } from '../../data/marchanzider-model/assignCompanyName';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSubCategoriesService {

  constructor(private db: AngularFireDatabase) { }
  addProductInfo(obj) {
    return  this.db.list(`${Company.cName}/productSubCategories/`).push(obj);
   }

   updateProductInfo(id, obj) {
    return this.db.object(`${Company.cName}/productSubCategories/` + id).update(obj);
   }
   
 getByIdProductInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/productSubCategories/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllProductInfo() { 
  return this.db.list(`${Company.cName}/productSubCategories`);
}

  deleteProductInfo(key: string) {
  return this.db.list(`${Company.cName}/productSubCategories`).remove(key);
}
}
