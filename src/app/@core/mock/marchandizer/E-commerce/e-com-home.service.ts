import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EComHomeService {
 
  constructor(private db: AngularFireDatabase) { 
   
  }
  addProductInfo(obj,cmny) {
    
    return  this.db.list(`${cmny}/ProductInfo/`).push(obj);
   }

   updateProductInfo(id, obj,cmny) {
    return this.db.object(`${cmny}/ProductInfo/` + id).update(obj);
   }
   
 getByIdProductInfo(id,cmny):Observable<any>{
  return this.db.list(`${cmny}/ProductInfo/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllProductInfo(cmny) { 
  return this.db.list(`${cmny}/ProductInfo`);
}

  deleteProductInfo(key: string,cmny) {
  return this.db.list(`${cmny}/ProductInfo`).remove(key);
}
}
