import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';
@Injectable({
  providedIn: 'root'
})
  export class ProductInfoService {

    constructor(private db: AngularFireDatabase) { 
    
    }
    addProductInfo(obj) {
      
      return  this.db.list(`${Company.cName}/ProductInfo/`).push(obj);
    }

    updateProductInfo(id, obj) {
      return this.db.object(`${Company.cName}/ProductInfo/` + id).update(obj);
    }
    
  getByIdProductInfo(id):any{
    return this.db.object(`${Company.cName}/ProductInfo/` + id)
    .valueChanges();
     
  }

  
    getAllProductInfo()  { 
    return this.db.list(`${Company.cName}/ProductInfo`);
  }

    deleteProductInfo(key: string) {
    return this.db.list(`${Company.cName}/ProductInfo`).remove(key);
  }

  
  }
