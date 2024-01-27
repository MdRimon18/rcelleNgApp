import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
  export class CustomerService {

    constructor(private db: AngularFireDatabase) { }
    
    addMyCustomerProfileInfo(obj) {
      return  this.db.list(`/${Company.cName}/MyCustomerProfile/`).push(obj);
    }
      
    updateMyCustomerProfileInfo(id, obj) {
      return this.db.object(`${Company.cName}/MyCustomerProfile/` + id).update(obj);
    }
    
  getByIdMyCustomerProfileInfo(id):Observable<any>{
    return this.db.list(`${Company.cName}/MyCustomerProfile/` + id)
    .valueChanges()
    .pipe(catchError(err => of(null)));
  }

  
  getAllMyCustomerProfileInfo() { 
    return this.db.list(`${Company.cName}/MyCustomerProfile`);
  }

    deleteMyCustomerProfileInfo(key: string) {
    return this.db.list(`${Company.cName}/MyCustomerProfile`).remove(key);
  }
  }
